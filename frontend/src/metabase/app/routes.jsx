import { t } from "ttag";

import { Route } from "metabase/hoc/Title";

import { AccessRequestDetail } from "./AccessRequestDetail";
import { AccessRequestForm } from "./AccessRequestForm";
import { AccessRequestPortal } from "./AccessRequestPortal";
import { AccessRequestSystems } from "./AccessRequestSystems";
import { ComponentsLibrary } from "./ComponentsLibrary";
import { ManageAccessRequests } from "./ManageAccessRequests";

const getRoutes = () => {
  return (
    <Route path="/apps">
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
        title={t`Access Request`}
        component={AccessRequestSystems}
      />
      <Route
        path="manage-access-requests"
        title={t`Manage Access Requests`}
        component={ManageAccessRequests}
      />
      <Route
        path="manage-access-requests/:id"
        title={t`Access Request`}
        component={AccessRequestDetail}
      />
    </Route>
  );
};

export default getRoutes;
