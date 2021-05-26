import { lazy } from 'react';
import { Activity } from 'react-feather';
import LINKS from 'utils/constants/links';

const WorkflowTemplateList = lazy(() => import(/* webpackChunkName: 'WorkflowTemplateList' */ 'pages/WorkflowTemplates/WorkflowTemplateList'));
const AddWorkflowTemplate = lazy(() => import(/* webpackChunkName: 'AddWorkflowTemplate' */ 'pages/WorkflowTemplates/AddWorkflowTemplate'));
const EditWorkflowTemplate = lazy(() => import(/* webpackChunkName: 'EditWorkflowTemplate' */ 'pages/WorkflowTemplates/EditWorkflowTemplate'));
const WorkflowTemplateHistory = lazy(() =>
  import(/* webpackChunkName: 'WorkflowTemplateHistory' */ 'pages/WorkflowTemplates/WorkflowTemplateHistory')
);
const WorkflowTemplateChart = lazy(() => import(/* webpackChunkName: 'WorkflowTemplateChart' */ 'pages/WorkflowTemplates/WorkflowTemplateChart'));

const workflowTemplateRoutes = Object.freeze({
  id: LINKS.WORKFLOW_TEMPLATES.TITLE,
  path: LINKS.WORKFLOW_TEMPLATES.HREF,
  icon: <Activity />,
  component: WorkflowTemplateList,
  children: [
    {
      path: LINKS.WORKFLOW_TEMPLATES.HREF,
      name: LINKS.WORKFLOW_TEMPLATES.TITLE,
      component: WorkflowTemplateList,
    },
    {
      path: LINKS.ADD_WORKFLOW_TEMPLATE.HREF,
      name: LINKS.ADD_WORKFLOW_TEMPLATE.TITLE,
      component: AddWorkflowTemplate,
      isNotSlide: true,
    },
    {
      path: LINKS.EDIT_WORKFLOW_TEMPLATE.HREF,
      name: LINKS.EDIT_WORKFLOW_TEMPLATE.TITLE,
      component: EditWorkflowTemplate,
      isNotSlide: true,
    },
    {
      path: LINKS.WORKFLOW_TEMPLATE_HISTORY.HREF,
      name: LINKS.WORKFLOW_TEMPLATE_HISTORY.TITLE,
      component: WorkflowTemplateHistory,
      isNotSlide: true,
    },
    {
      path: LINKS.WORKFLOW_TEMPLATE_CHART.HREF,
      name: LINKS.WORKFLOW_TEMPLATE_CHART.TITLE,
      component: WorkflowTemplateChart,
      isNotSlide: true,
    },
  ],
});

export default workflowTemplateRoutes;
