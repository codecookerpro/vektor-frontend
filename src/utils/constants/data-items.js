import { PERMISSION_TYPES, ACTION_TYPES, ENTITY_NAME_TYPES } from './enums';

export const EQUIPMENTS = [
  {
    LABEL: 'Process',
    VALUE: 'PROCESS',
  },
  {
    LABEL: 'Utilities',
    VALUE: 'UTILITIES',
  },
  {
    LABEL: 'Analytics',
    VALUE: 'ANALYTICS',
  },
  {
    LABEL: 'Automation',
    VALUE: 'AUTOMATION',
  },
  {
    LABEL: 'Computer systems',
    VALUE: 'COMPUTER_SYSTEMS',
  },
];

export const EQUIPMENT_CATEGORIES = [
  {
    LABEL: 'Custom',
    VALUE: 'CUSTOM',
  },
  {
    LABEL: 'Commercial off the shelf',
    VALUE: 'COMMERCIAL',
  },
];

export const PERMISSIONS = [
  {
    LABEL: 'Admin',
    VALUE: PERMISSION_TYPES.admin,
  },
  {
    LABEL: 'Supervisor',
    VALUE: PERMISSION_TYPES.supervisor,
  },
  {
    LABEL: 'Project Manager',
    VALUE: PERMISSION_TYPES.projectManager,
  },
  {
    LABEL: 'User',
    VALUE: PERMISSION_TYPES.user,
  },
  {
    LABEL: 'Viewer',
    VALUE: PERMISSION_TYPES.viewer,
  },
];

export const ACTIONS = [
  { value: ACTION_TYPES.create, label: 'Create' },
  { value: ACTION_TYPES.update, label: 'Update' },
  { value: ACTION_TYPES.delete, label: 'Delete' },
  { value: ACTION_TYPES.createNested, label: 'Create Nested' },
  { value: ACTION_TYPES.updateNested, label: 'Update Nested' },
  { value: ACTION_TYPES.deleteNested, label: 'Delete Nested' },
];

export const ENTITY_NAMES = [
  { value: ENTITY_NAME_TYPES.event, label: 'Event' },
  { value: ENTITY_NAME_TYPES.metaSystem, label: 'Meta System' },
  { value: ENTITY_NAME_TYPES.organization, label: 'Organization' },
  { value: ENTITY_NAME_TYPES.project, label: 'Project' },
  { value: ENTITY_NAME_TYPES.sow, label: 'SOW' },
  { value: ENTITY_NAME_TYPES.system, label: 'System' },
  { value: ENTITY_NAME_TYPES.user, label: 'User' },
  { value: ENTITY_NAME_TYPES.workflow, label: 'Workflow' },
];
