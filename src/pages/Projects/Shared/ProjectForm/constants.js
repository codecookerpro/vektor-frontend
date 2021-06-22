import { PERMISSION_TYPE } from 'utils/constants/permissions';

export const PROJECT_DEFAULT_VALUES = { name: '', number: '', supervisor: '', _id: '', organization: '', projectManager: '', assignedUsers: [] };
export const ALLOWED_ROLES = [PERMISSION_TYPE.ADMIN, PERMISSION_TYPE.SUPERVISOR];
