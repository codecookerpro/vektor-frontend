export const GENERIC_ERRORS = {
  VALIDATION: 1000,
  AUTH: 1001,
  ACCESS_TOKEN_EXP: 1002,
  PERMISSION: 1003,
  NOT_FOUND: 1004,
  ACC_SUSPENDED: 1005,
  REFRESH_TOKEN: 1006,
};

export const LOCAL_SIGN_IN_ERRORS = {
  102: 'Incorrect password',
  103: "Account has no password, use 'forgot password' to set a password",
};

export const LOCAL_CHANGE_PASSWORD_ERRORS = {
  ...LOCAL_SIGN_IN_ERRORS,
  102: 'Incorrect Old password',
};
