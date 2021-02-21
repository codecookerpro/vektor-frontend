
import * as yup from 'yup'

const EMAIL_VALID = yup.string()
  .email("Must be a valid email")
  .max(255)
  .required("Email is required");

const PASSWORD_VALID = yup.string()
  .required('Please enter in Password.')
  .min(6, 'Passwords need to be at least 6 characters.');

export {
  EMAIL_VALID,
  PASSWORD_VALID
};