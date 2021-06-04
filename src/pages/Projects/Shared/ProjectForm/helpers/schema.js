import joi from 'joi';

import { STRING_INPUT_VALID, SELECT_VALID } from 'utils/constants/validations';

export const schema = joi.object().keys({
  name: STRING_INPUT_VALID,
  number: STRING_INPUT_VALID,
  organization: SELECT_VALID,
  projectManager: joi.string().allow(''),
  supervisor: joi.string().allow(''),
  assignedUsers: joi.array(),
});
