import { keyMirror } from 'utils/helpers/utility';

export const PERMISSION_TYPES = Object.freeze({
  admin: 'ADMIN',
  supervisor: 'SUPERVISOR',
  projectManager: 'PROJECT_MANAGER',
  user: 'USER',
  viewer: 'VIEWER',
});

export const EQUIPMENT_TYPES = keyMirror({
  process: 'PROCESS',
  utilities: 'UTILITIES',
  analytics: 'ANALYTICS',
  automation: 'AUTOMATION',
  computerSystems: 'COMPUTER_SYSTEMS',
});

export const EQUIPMENT_CATEGORY_TYPES = keyMirror({
  custom: 'CUSTOM',
  commercial: 'COMMERCIAL',
});

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
