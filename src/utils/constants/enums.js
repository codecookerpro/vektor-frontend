import { keyMirror } from 'utils/helpers/utility';

export const PERMISSION_TYPES = {
  admin: 'ADMIN',
  supervisor: 'SUPERVISOR',
  projectManager: 'PROJECT_MANAGER',
  user: 'USER',
  viewer: 'VIEWER',
};

export const FORM_MODE = keyMirror({
  create: null,
  update: null,
  view: null,
});

export const POPUP_TYPE = keyMirror({
  info: null,
  confirm: null,
  error: null,
  inactive: null,
});

export const ACTION_TYPES = {
  create: 'CREATE',
  update: 'UPDATE',
  delete: 'DELETE',
  createNested: 'CREATE_NESTED',
  updateNested: 'UPDATE_NESTED',
  deleteNested: 'DELETE_NESTED',
};

export const ENTITY_NAME_TYPES = {
  event: 'Event',
  metaSystem: 'MetaSystem',
  organization: 'Organization',
  project: 'Project',
  sow: 'SOW',
  system: 'System',
  user: 'User',
  workflow: 'Workflow',
};
