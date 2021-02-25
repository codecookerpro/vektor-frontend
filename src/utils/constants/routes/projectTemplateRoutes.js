import { lazy } from 'react';
import { Activity } from 'react-feather';

const WorkflowTemplateList = lazy(() => import(/* webpackChunkName: 'WorkflowTemplateList' */ 'pages/WorkflowTemplates/WorkflowTemplateList'));
const AddEditWorkflowTemplate = lazy(() => import(/* webpackChunkName: 'AddEditWorkflowTemplate' */ 'pages/WorkflowTemplates/AddEditWorkflowTemplate'));
const PhaseTemplateList = lazy(() => import(/* webpackChunkName: 'PhaseTemplateList' */ 'pages/PhaseTemplates/PhaseTemplateList'));
const AddEditPhaseTemplate = lazy(() => import(/* webpackChunkName: 'AddEditPhaseTemplate' */ 'pages/PhaseTemplates/AddEditPhaseTemplate'));
import LINKS from 'utils/constants/links';

const projectTemplateRoutes = Object.freeze({
  id: LINKS.PROJECT_TEMPLATE.TITLE,
  path: LINKS.PROJECT_TEMPLATE.HREF,
  icon: <Activity />,
  containsHome: true,
  children: [
    {
      path: LINKS.WORKFLOW_TEMPLATES.HREF,
      name: LINKS.WORKFLOW_TEMPLATES.TITLE,
      component: WorkflowTemplateList,
    },
    {
      path: LINKS.ADD_WORKFLOW_TEMPLATE.HREF,
      name: LINKS.ADD_WORKFLOW_TEMPLATE.TITLE,
      component: AddEditWorkflowTemplate,
      isNotSlide: true,
    },
    {
      path: LINKS.PHASE_TEMPLATES.HREF,
      name: LINKS.PHASE_TEMPLATES.TITLE,
      component: PhaseTemplateList,
    },
    {
      path: LINKS.ADD_PHASE_TEMPLATE.HREF,
      name: LINKS.ADD_PHASE_TEMPLATE.TITLE,
      component: AddEditPhaseTemplate,
      isNotSlide: true,
    },
  ],
  component: null,
});

export default projectTemplateRoutes;