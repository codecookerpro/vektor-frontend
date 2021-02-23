import { lazy } from 'react';
import { CheckSquare } from 'react-feather';

const Pickers = lazy(() => import(/* webpackChunkName: 'Pickers' */ 'pages/forms/Pickers'));
const SelectionCtrls = lazy(() => import(/* webpackChunkName: 'SelectionCtrls' */ 'pages/forms/SelectionControls'));
const Selects = lazy(() => import(/* webpackChunkName: 'Selects' */ 'pages/forms/Selects'));
const TextFields = lazy(() => import(/* webpackChunkName: 'TextFields' */ 'pages/forms/TextFields'));
const Dropzone = lazy(() => import(/* webpackChunkName: 'Dropzone' */ 'pages/forms/Dropzone'));
const Editors = lazy(() => import(/* webpackChunkName: 'Editors' */ 'pages/forms/Editors'));
const Formik = lazy(() => import(/* webpackChunkName: 'Formik' */ 'pages/forms/Formik'));

const formsRoutes = Object.freeze({
  id: 'Forms',
  path: '/forms',
  icon: <CheckSquare />,
  children: [
    {
      path: '/forms/pickers',
      name: 'Pickers',
      component: Pickers,
    },
    {
      path: '/forms/selection-controls',
      name: 'Selection Controls',
      component: SelectionCtrls,
    },
    {
      path: '/forms/selects',
      name: 'Selects',
      component: Selects,
    },
    {
      path: '/forms/text-fields',
      name: 'Text Fields',
      component: TextFields,
    },
    {
      path: '/forms/dropzone',
      name: 'Dropzone',
      component: Dropzone,
    },
    {
      path: '/forms/editors',
      name: 'Editors',
      component: Editors,
    },
    {
      path: '/forms/formik',
      name: 'Formik',
      component: Formik,
    },
  ],
  component: null,
});

export default formsRoutes;
