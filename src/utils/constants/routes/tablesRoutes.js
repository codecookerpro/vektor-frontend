import { lazy } from 'react';
import { List } from 'react-feather';

const SimpleTable = lazy(() => import(/* webpackChunkName: 'SimpleTable' */ 'pages/tables/SimpleTable'));
const AdvancedTable = lazy(() => import(/* webpackChunkName: 'AdvancedTable' */ 'pages/tables/AdvancedTable'));
const DataGrid = lazy(() => import(/* webpackChunkName: 'DataGrid' */ 'pages/tables/DataGrid'));

const tablesRoutes = {
  id: 'Tables',
  path: '/tables',
  icon: <List />,
  children: [
    {
      path: '/tables/simple-table',
      name: 'Simple Table',
      component: SimpleTable,
    },
    {
      path: '/tables/advanced-table',
      name: 'Advanced Table',
      component: AdvancedTable,
    },
    {
      path: '/tables/data-grid',
      name: 'Data Grid',
      component: DataGrid,
    },
  ],
  component: null,
};

export default tablesRoutes;
