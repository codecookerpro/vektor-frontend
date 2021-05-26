import * as yup from 'yup';
import joi from 'joi';
import tlds from '@sideway/address/lib/tlds';

const EMAIL_VALID_SIGN_IN = joi
  .string()
  .email({ tlds: { allow: tlds } })
  .max(255)
  .required()
  .messages({
    'string.base': `Must be a valid email`,
    'string.empty': `Email cannot be an empty field`,
    'string.required': `Email is required`,
  });

const PASSWORD_VALID_SIGN_IN = joi.string().required().min(6).max(64).messages({
  'string.base': `Must be a valid password`,
  'string.empty': `Password cannot be an empty field`,
  'string.min': `Passwords need to be at least 6 characters.`,
  'string.max': `Passwords maximum length has to be less than 64 characters.`,
  'string.required': `Please enter in Password.`,
});

const EMAIL_VALID = yup.string().email('Must be a valid email').max(255).required('Email is required');
const PASSWORD_VALID = yup
  .string()
  .required('Please enter in Password.')
  .min(6, 'Passwords need to be at least 6 characters.')
  .max(64, 'Passwords maximum length has to be less than 64 characters.');

const STRING_INPUT_VALID = yup.string().required('This field is required.');

const SELECT_VALID = yup.string().required('Please Select one.');

const INTEGER_VALID = yup
  .number()
  .typeError('Please specify a number.')
  .integer('Please input number.')
  .min(1, 'This field should be more than one.');

export { EMAIL_VALID, PASSWORD_VALID, STRING_INPUT_VALID, SELECT_VALID, INTEGER_VALID, EMAIL_VALID_SIGN_IN, PASSWORD_VALID_SIGN_IN };
