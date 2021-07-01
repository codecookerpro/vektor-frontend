import { EQUIPMENT_TYPES, EQUIPMENT_CATEGORY_TYPES, PERMISSION_TYPES, ACTION_TYPES, ENTITY_NAME_TYPES } from './enums';

// Equipment
export const EQUIPMENTS = [
  {
    LABEL: EQUIPMENT_TYPES.process,
    VALUE: EQUIPMENT_TYPES.process,
  },
  {
    LABEL: EQUIPMENT_TYPES.utilities,
    VALUE: EQUIPMENT_TYPES.utilities,
  },
  {
    LABEL: EQUIPMENT_TYPES.analytics,
    VALUE: EQUIPMENT_TYPES.analytics,
  },
  {
    LABEL: EQUIPMENT_TYPES.automation,
    VALUE: EQUIPMENT_TYPES.automation,
  },
  {
    LABEL: EQUIPMENT_TYPES.computerSystems,
    VALUE: EQUIPMENT_TYPES.computerSystems,
  },
];

// Equipment Category
export const EQUIPMENT_CATEGORIES = [
  {
    LABEL: EQUIPMENT_CATEGORY_TYPES.custom,
    VALUE: EQUIPMENT_CATEGORY_TYPES.custom,
  },
  {
    LABEL: EQUIPMENT_CATEGORY_TYPES.commercial,
    VALUE: EQUIPMENT_CATEGORY_TYPES.commercial,
  },
];

// User Permission
export const PERMISSIONS = [
  {
    LABEL: PERMISSION_TYPES.admin,
    VALUE: PERMISSION_TYPES.admin,
  },
  {
    LABEL: PERMISSION_TYPES.supervisor,
    VALUE: PERMISSION_TYPES.supervisor,
  },
  {
    LABEL: PERMISSION_TYPES.projectManager,
    VALUE: PERMISSION_TYPES.projectManager,
  },
  {
    LABEL: PERMISSION_TYPES.user,
    VALUE: PERMISSION_TYPES.user,
  },
  {
    LABEL: PERMISSION_TYPES.viewer,
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
