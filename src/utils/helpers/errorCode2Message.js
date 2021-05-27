export const errorCode2Message = (code, localErrors) => {
  return localErrors[code] || 'Something went wrong!';
};
