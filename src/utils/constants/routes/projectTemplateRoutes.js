import { lazy } from 'react';
import { Activity } from 'react-feather';

const WorkflowTemplateList = lazy(() => import(/* webpackChunkName: 'WorkflowTemplateList' */ 'pages/WorkflowTemplates/WorkflowTemplateList'));
const PhaseTemplateList = lazy(() => import(/* webpackChunkName: 'PhaseTemplateList' */ 'pages/PhaseTemplates/PhaseTemplateList'));
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
      path: LINKS.PHASE_TEMPLATES.HREF,
      name: LINKS.PHASE_TEMPLATES.TITLE,
      component: PhaseTemplateList,
    },
  ],
  component: null,
});

export default projectTemplateRoutes;