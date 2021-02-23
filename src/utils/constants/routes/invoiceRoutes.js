import { lazy } from 'react';
import { CreditCard } from 'react-feather';

const InvoiceDetails = lazy(() => import(/* webpackChunkName: 'InvoiceDetails' */ 'pages/pages/InvoiceDetails'));
const InvoiceList = lazy(() => import(/* webpackChunkName: 'InvoiceList' */ 'pages/pages/InvoiceList'));

const invoiceRoutes = Object.freeze({
  id: 'Invoices',
  path: '/invoices',
  icon: <CreditCard />,
  children: [
    {
      path: '/invoices',
      name: 'List',
      component: InvoiceList,
    },
    {
      path: '/invoices/detail',
      name: 'Details',
      component: InvoiceDetails,
    },
  ],
  component: null,
});

export default invoiceRoutes;