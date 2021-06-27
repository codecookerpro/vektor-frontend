import { EQUIPMENT_TYPES, EQUIPMENT_CATEGORY_TYPES, PERMISSION_TYPES } from './enums';

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
