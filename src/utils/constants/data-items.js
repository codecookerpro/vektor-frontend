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
    LABLE: EQUIPMENT_CATEGORY_TYPES.custom,
    VALUE: EQUIPMENT_CATEGORY_TYPES.custom,
  },
  {
    LABLE: EQUIPMENT_CATEGORY_TYPES.commercial,
    VALUE: EQUIPMENT_CATEGORY_TYPES.commercial,
  },
];

// User Permission
export const PERMISSIONS = [
  {
    LABEL: PERMISSION_TYPES.ADMIN,
    VALUE: PERMISSION_TYPES.ADMIN,
  },
  {
    LABEL: PERMISSION_TYPES.SUPERVISOR,
    VALUE: PERMISSION_TYPES.SUPERVISOR,
  },
  {
    LABEL: PERMISSION_TYPES.PROJECT_MANAGER,
    VALUE: PERMISSION_TYPES.PROJECT_MANAGER,
  },
  {
    LABEL: PERMISSION_TYPES.USER,
    VALUE: PERMISSION_TYPES.USER,
  },
  {
    LABEL: PERMISSION_TYPES.VIEWER,
    VALUE: PERMISSION_TYPES.VIEWER,
  },
];
