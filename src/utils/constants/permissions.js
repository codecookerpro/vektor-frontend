
const PERMISSION_TYPE = Object.freeze({
  ADMIN: 'ADMIN',
  SUPERVISOR: 'SUPERVISOR',
  PROJECT_MANAGER: 'PROJECT_MANAGER',
  USER: 'USER',
  VIEWER: 'VIEWER',
})

const PERMISSIONS = [
  {
    LABEL: PERMISSION_TYPE.ADMIN,
    VALUE: PERMISSION_TYPE.ADMIN,
  },
  {
    LABEL: PERMISSION_TYPE.SUPERVISOR,
    VALUE: PERMISSION_TYPE.SUPERVISOR,
  },
  {
    LABEL: PERMISSION_TYPE.PROJECT_MANAGER,
    VALUE: PERMISSION_TYPE.PROJECT_MANAGER,
  },
  {
    LABEL: PERMISSION_TYPE.USER,
    VALUE: PERMISSION_TYPE.USER,
  },
  {
    LABEL: PERMISSION_TYPE.VIEWER,
    VALUE: PERMISSION_TYPE.VIEWER,
  },
];

export {
  PERMISSION_TYPE,
  PERMISSIONS
};
