import { t } from "ttag";

import { Route } from "metabase/hoc/Title";

import { AccessRequestForm } from "./AccessRequestForm";
import { AccessRequestPortal } from "./AccessRequestPortal";
import { AccessRequestSystems } from "./AccessRequestSystems";
import { ComponentsLibrary } from "./ComponentsLibrary";

const getRoutes = () => {
  return (
    <Route path="/app">
      <Route
        path="components-showcase"
        title={t`Components Library`}
        component={ComponentsLibrary}
      />
      <Route
        path="access-request-portal"
        title={t`Access Request Portal`}
        component={AccessRequestPortal}
      />
      <Route
        path="access-request-systems/new"
        title={t`Access Request Form`}
        component={AccessRequestForm}
      />
      <Route
        path="access-request-systems"
        title={t`Access Request Systems`}
        component={AccessRequestSystems}
      />
    </Route>
  );
};

export default getRoutes;
