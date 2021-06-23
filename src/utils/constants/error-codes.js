export const GENERIC_ERRORS = {
  validation: 1000,
  auth: 1001,
  accessTokenExp: 1002,
  permission: 1003,
  notFound: 1004,
  accSuspended: 1005,
  refreshToken: 1006,
};

export const LOCAL_SIGN_IN_ERRORS = {
  102: 'Incorrect password',
  103: "Account has no password, use 'forgot password' to set a password",
};

export const LOCAL_CHANGE_PASSWORD_ERRORS = {
  ...LOCAL_SIGN_IN_ERRORS,
  102: 'Incorrect Old password',
};

export const LOCAL_ORGANIZATION_ERRORS = {
  100: 'Organization already exist',
};
