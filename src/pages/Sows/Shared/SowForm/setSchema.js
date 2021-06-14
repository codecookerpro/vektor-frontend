import joi from 'joi';
import { SELECT_VALID, STRING_INPUT_VALID } from 'utils/constants/validations';

const setSchema = (visible) =>
  visible
    ? joi.object().keys({
        name: STRING_INPUT_VALID,
        organization: SELECT_VALID,
        metaSystem: SELECT_VALID,
      })
    : joi.object().keys({
        name: STRING_INPUT_VALID,
        metaSystem: SELECT_VALID,
      });

export default setSchema;
