import { compose } from 'recompose';
import withApollo from './withApollo'
// import withIntl from './withIntl'
// import withPermission from '../utils/withPermissionNew'
import withAuthv2 from '../utils/authv2';
import withAuth from '../utils/auth';
import WebLayout from './WebLayout';
// import BasicLayout from './BasicLayout';
// import BasicLayoutNotMenu from './BasicLayoutNotMenu';

export const pageWithoutLayout = compose(
  // withReduxSaga,
  withApollo,
  // withIntl
);

export const apollo = compose(
  // withReduxSaga,
  withApollo,
);

export const pageAntdLayoutNotMenu = compose(
  withAuthv2,
  // withPermission,
  // BasicLayoutNotMenu
);
export const pageAntdLayout = compose(
  withAuth,
  // withPermission,
  // BasicLayout
);

export default compose(
  pageWithoutLayout,
  WebLayout
);