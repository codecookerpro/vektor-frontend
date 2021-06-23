import { ACTIONS } from 'pages/Projects/constants';
import { PERMISSION_TYPES } from 'utils/constants';

export const ACTIONS_DATA = [
  { title: 'Rename phase', action: ACTIONS.RENAME },
  { title: 'Delete Phase', action: ACTIONS.DELETE },
];

export const ALLOWED_ROLES = [PERMISSION_TYPES.admin, PERMISSION_TYPES.supervisor, PERMISSION_TYPES.projectManager];
