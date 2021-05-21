import { lazy } from 'react';
import { CheckSquare } from 'react-feather';

const SelectionCtrls = lazy(() => import(/* webpackChunkName: 'SelectionCtrls' */ 'pages/forms/SelectionControls'));
const TextFields = lazy(() => import(/* webpackChunkName: 'TextFields' */ 'pages/forms/TextFields'));
const Dropzone = lazy(() => import(/* webpackChunkName: 'Dropzone' */ 'pages/forms/Dropzone'));
const Editors = lazy(() => import(/* webpackChunkName: 'Editors' */ 'pages/forms/Editors'));

const formsRoutes = Object.freeze({
  id: 'Forms',
  path: '/forms',
  icon: <CheckSquare />,
  children: [
    {
      path: '/forms/selection-controls',
      name: 'Selection Controls',
      component: SelectionCtrls,
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
  ],
  component: null,
});

export default formsRoutes;
