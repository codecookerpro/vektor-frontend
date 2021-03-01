
import * as yup from 'yup'

const EMAIL_VALID = yup.string()
  .email('Must be a valid email')
  .max(255)
  .required('Email is required');

const PASSWORD_VALID = yup.string()
  .required('Please enter in Password.')
  .min(6, 'Passwords need to be at least 6 characters.');

const STRING_INPUT_VALID = yup.string()
  .required('This field is required.')

const SELECT_VALID = yup.string()
  .required('Please Select one.')

export {
  EMAIL_VALID,
  PASSWORD_VALID,
  STRING_INPUT_VALID,
  SELECT_VALID
};