import * as yup from 'yup';

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

export { EMAIL_VALID, PASSWORD_VALID, STRING_INPUT_VALID, SELECT_VALID, INTEGER_VALID };
