import { ACTIONS } from 'pages/Projects/constants';
import { PERMISSION_TYPE } from 'utils/constants/permissions';

export const ACTIONS_DATA = [
  { title: 'Rename phase', action: ACTIONS.RENAME },
  { title: 'Delete Phase', action: ACTIONS.DELETE },
];

export const ALLOWED_ROLES = [PERMISSION_TYPE.ADMIN, PERMISSION_TYPE.SUPERVISOR, PERMISSION_TYPE.PROJECT_MANAGER];
