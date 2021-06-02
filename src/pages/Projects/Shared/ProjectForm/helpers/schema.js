import joi from 'joi';

import { STRING_INPUT_VALID, SELECT_VALID, INTEGER_VALID } from 'utils/constants/validations';

export const schema = joi.object().keys({
  name: STRING_INPUT_VALID,
  number: INTEGER_VALID,
  organization: SELECT_VALID,
  pm: joi.string().allow(''),
  supervisor: joi.string().allow(''),
  assignedUsers: joi.array(),
});
