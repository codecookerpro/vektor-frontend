import joi from 'joi';
import { EMAIL_VALID, PASSWORD_VALID, SELECT_VALID, STRING_INPUT_VALID } from 'utils/constants/validations';
import { PERMISSION_TYPES } from 'utils/constants';

const setSchema = (mode, selectPermission) => {
  const schema = {
    email: EMAIL_VALID,
    name: STRING_INPUT_VALID,
    permissions: SELECT_VALID,
  };
  if (mode) schema.password = PASSWORD_VALID;
  if (selectPermission !== PERMISSION_TYPES.admin) schema.organization = SELECT_VALID;
  return joi.object().keys(schema);
};

export default setSchema;
