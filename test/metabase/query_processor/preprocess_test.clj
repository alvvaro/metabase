(ns metabase.query-processor.preprocess-test
  (:require
   [clojure.string :as str]
   [clojure.test :refer :all]
   [metabase.driver :as driver]
   [metabase.lib.core :as lib]
   [metabase.lib.metadata :as lib.metadata]
   [metabase.lib.test-metadata :as meta]
   [metabase.lib.test-util :as lib.tu]
   [metabase.lib.test-util.macros :as lib.tu.macros]
   [metabase.query-processor :as qp]
   [metabase.query-processor.middleware.annotate :as annotate]
   [metabase.query-processor.preprocess :as qp.preprocess]
   [metabase.test :as mt]
   [metabase.test.data.interface :as tx]
   [metabase.util.humanization :as u.humanization]))

(deftest preprocess-caching-test
  (testing "`preprocess` should work the same even if query has cached results (#18579)"
    ;; make a copy of the `test-data` DB so there will be no cache entries from previous test runs possibly affecting
    ;; this test.
    (mt/with-temp-copy-of-db
      (let [query            (assoc (mt/mbql-query venues {:order-by [[:asc $id]], :limit 5})
                                    :cache-strategy {:type             :ttl
                                                     :multiplier       60
                                                     :avg-execution-ms 100
                                                     :min-duration-ms  0})
            run-query        (fn []
                               (let [results (qp/process-query query)]
                                 {:cached?  (boolean (:cached (:cache/details results)))
                                  :num-rows (count (mt/rows results))}))
            expected-results (qp.preprocess/preprocess query)]
        (testing "Check preprocess before caching to make sure results make sense"
          (is (=? {:database (mt/id)}
                  expected-results)))
        (testing "Run the query a few of times so we know it's cached"
          (testing "first run"
            (is (= {:cached?  false
                    :num-rows 5}
                   (run-query))))
          (testing "should be cached now"
            (is (= {:cached?  true
                    :num-rows 5}
                   (run-query))))
          (testing "preprocess should return same results even when query was cached."
            (is (= expected-results
                   (qp.preprocess/preprocess query)))))))))

(driver/register! ::custom-escape-spaces-to-underscores :parent :h2)

(defmethod tx/create-db! ::custom-escape-spaces-to-underscores
  [& _]
  ;; no-op since we should be able to reuse the data from H2 tests
  nil)

(defmethod tx/destroy-db! ::custom-escape-spaces-to-underscores
  [& _]
  ;; no-op since we don't want to stomp on data used by H2 tests
  nil)

(defmethod driver/escape-alias ::custom-escape-spaces-to-underscores
  [driver field-alias]
  (-> ((get-method driver/escape-alias :h2) driver field-alias)
      (str/replace #"\s" "_")))

(deftest ^:parallel query->expected-cols-test
  (testing "field_refs in expected columns have the original join aliases (#30648)"
    (mt/dataset test-data
      (binding [driver/*driver* ::custom-escape-spaces-to-underscores]
        (let [query
              (mt/mbql-query
                products
                {:joins
                 [{:source-query
                   {:source-table $$orders
                    :joins
                    [{:source-table $$people
                      :alias "People"
                      :condition [:= $orders.user_id &People.people.id]
                      :fields [&People.people.address]
                      :strategy :left-join}]
                    :fields [$orders.id &People.people.address]}
                   :alias "Question 54"
                   :condition [:= $id [:field %orders.id {:join-alias "Question 54"}]]
                   :fields [[:field %orders.id {:join-alias "Question 54"}]
                            [:field %people.address {:join-alias "Question 54"}]]
                   :strategy :left-join}]
                 :fields
                 [!default.created_at
                  [:field %orders.id {:join-alias "Question 54"}]
                  [:field %people.address {:join-alias "Question 54"}]]})]
          (is (=? [{:name "CREATED_AT"
                    :field_ref [:field (mt/id :products :created_at) {:temporal-unit :default}]
                    :display_name "Created At"}
                   {:name "ID"
                    :field_ref [:field (mt/id :orders :id) {:join-alias "Question 54"}]
                    :display_name "Question 54 → ID"}
                   {:name "ADDRESS"
                    :field_ref [:field (mt/id :people :address) {:join-alias "Question 54"}]
                    :display_name "Question 54 → Address"}]
                  (qp.preprocess/query->expected-cols query))))))))

(deftest ^:parallel deduplicate-column-names-test
  (testing "`query->expected-cols` should return deduplicated column names"
    (is (= ["ID" "DATE" "USER_ID" "VENUE_ID" "ID_2" "NAME" "LAST_LOGIN"]
           (map :name (qp.preprocess/query->expected-cols
                       (mt/mbql-query checkins
                         {:source-table $$checkins
                          :joins
                          [{:fields       :all
                            :alias        "u"
                            :source-table $$users
                            :condition    [:= $user_id &u.users.id]}]})))))))

(deftest ^:parallel model-display-names-test
  (testing "Preserve display names from models"
    (let [native-cols (for [col [{:name "EXAMPLE_TIMESTAMP", :base_type :type/DateTime}
                                 {:name "EXAMPLE_DATE", :base_type :type/Date}
                                 {:name "EXAMPLE_WEEK_NUMBER", :base_type :type/Integer}
                                 {:name "EXAMPLE_WEEK", :base_type :type/DateTime}]]
                        (assoc col :display_name (:name col)))
          expected-display-names ["Example Timestamp"
                                  "Example Date"
                                  "Example Week Number"
                                  ;; old `annotate` behavior would append the temporal unit to the display name here
                                  ;; even tho we explicitly overrode the display name in the model metadata. I don't
                                  ;; think that behavior is desirable. New behavior takes the display name specified
                                  ;; by the user as-is.
                                  "Example Week"
                                  #_"Example Week: Week"]
          mp (as-> meta/metadata-provider mp
               (lib.tu/mock-metadata-provider
                mp
                {:cards
                 [{:id              1
                   :name            "NATIVE"
                   :database-id     (meta/id)
                   :dataset-query   {:database (meta/id), :type :native, :native {:query "SELECT * FROM some_table;"}}
                   :result-metadata native-cols}]})
               ;; Card 2 is a model that uses the Card 1 (a native query) as a source
               (lib.tu/mock-metadata-provider
                mp
                {:cards
                 [(let [query (lib.tu.macros/mbql-query nil
                                {:fields [[:field "EXAMPLE_TIMESTAMP" {:base-type :type/DateTime}]
                                          [:field "EXAMPLE_DATE" {:base-type :type/Date}]
                                          [:field "EXAMPLE_WEEK_NUMBER" {:base-type :type/Integer}]
                                          [:field "EXAMPLE_WEEK" {:base-type :type/DateTime, :temporal-unit :week}]]
                                 :source-table "card__1"})]
                    {:id              2
                     :type            :model
                     :name            "MODEL"
                     :database-id     (meta/id)
                     :dataset-query   query
                     :result-metadata (for [col (annotate/expected-cols (lib/query mp query))]
                                        (assoc col :display_name (u.humanization/name->human-readable-name :simple (:name col))))})]})
               ;; Card 3 is a model that uses Card 2 (also a model) as a source
               (lib.tu/mock-metadata-provider
                mp
                {:cards
                 [(let [query (lib.tu.macros/mbql-query nil {:source-table "card__2"})]
                    {:id              3
                     :type            :model
                     :name            "METAMODEL"
                     :database-id     (meta/id)
                     :dataset-query   query
                     ;; make sure we're getting metadata for the PREPROCESSED query.
                     :result-metadata (qp.preprocess/query->expected-cols (lib/query mp query))})]}))]
      (testing "Model (Card 2) saved result metadata"
        (is (= expected-display-names
               (map :display_name (:result-metadata (lib.metadata/card mp 2))))))
      (testing "Model => Model (Card 3) saved result metadata"
        (is (= expected-display-names
               (map :display_name (:result-metadata (lib.metadata/card mp 3))))))
      (testing "Ad-hoc Query with Model => Model (Card 3) as source result metadata"
        (is (= expected-display-names
               (map :display_name (qp.preprocess/query->expected-cols (lib/query mp (lib.metadata/card mp 3))))))))))

(deftest ^:parallel temporal-unit-in-display-name-test
  (testing "Columns bucketed on first stage have bucket in display name on following stage/s"
    (let [mp meta/metadata-provider
          q1 (-> (lib/query mp (lib.metadata/table mp (meta/id :orders)))
                 (lib/aggregate (lib/count))
                 (lib/breakout (lib/with-temporal-bucket
                                 (lib.metadata/field mp (meta/id :orders :created-at))
                                 :quarter))
                 (lib/breakout (lib/with-temporal-bucket
                                 (lib.metadata/field mp (meta/id :orders :created-at))
                                 :day-of-week)))
          q2 (lib/append-stage q1)]
      (is (= ["Created At: Quarter"
              "Created At: Day of week"
              "Count"]
             (map :display_name (qp.preprocess/query->expected-cols q2)))))))
