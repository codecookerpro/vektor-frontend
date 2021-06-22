import { PERMISSION_TYPES } from 'utils/constants';

export const PROJECT_DEFAULT_VALUES = { name: '', number: '', supervisor: '', _id: '', organization: '', projectManager: '', assignedUsers: [] };
export const ALLOWED_ROLES = [PERMISSION_TYPES.admin, PERMISSION_TYPES.supervisor];
