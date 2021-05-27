import joi from 'joi';
import tlds from '@sideway/address/lib/tlds';

const EMAIL_VALID = joi
  .string()
  .email({ tlds: { allow: tlds } })
  .max(255)
  .required()
  .messages({
    'string.base': `Must be a valid email`,
    'string.empty': `Email cannot be an empty field`,
    'string.required': `Email is required`,
  });

const PASSWORD_VALID = joi.string().required().min(6).max(64).messages({
  'string.base': `Must be a valid password`,
  'string.empty': `Password cannot be an empty field`,
  'string.min': `Passwords need to be at least 6 characters.`,
  'string.max': `Passwords maximum length has to be less than 64 characters.`,
  'string.required': `Please enter in Password.`,
});

const STRING_INPUT_VALID = joi.string().required().messages({
  'string.required': 'This field is required.',
});

const SELECT_VALID = joi.string().required().messages({
  'string.required': 'Please Select one.',
});

const INTEGER_VALID = joi.number().integer().min(1).messages({
  'number.integer': 'Please input number.',
  'number.min': 'This field should be more than one.',
  'number.base': 'Please specify a number.',
});

export { EMAIL_VALID, PASSWORD_VALID, STRING_INPUT_VALID, SELECT_VALID, INTEGER_VALID };
