export const changeToString = (change) => {
  if (Array.isArray(change)) {
    if (change.length === 0) {
      return 'emtpy array';
    } else if (typeof change[0] === 'object') {
      return `${change.length} objects`;
    } else {
      return change.toString();
    }
  } else if (change) {
    return change.toString();
  } else {
    return '';
  }
};
