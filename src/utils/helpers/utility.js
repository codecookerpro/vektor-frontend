export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};

export const keyMirror = (obj) =>
  Object.freeze(
    Object.keys(obj).reduce(
      (acc, key) => ({
        ...acc,
        [key]: obj[key] ? obj[key] : key,
      }),
      {}
    )
  );

export const restrict = (obj, keys = []) =>
  keys.reduce((acc, key) => {
    return {
      ...acc,
      [key]: obj[key],
    };
  }, {});

export const paginate = (records, skip = 0, limit = 10) => {
  if (isEmpty(records)) {
    return [];
  } else if (limit > 0) {
    return records.slice(skip, skip + limit);
  }
  return records;
};

export const exclude = (obj, keys = []) => {
  const excludedKeys = Object.keys(obj).filter((key) => !keys.includes(key));
  return restrict(obj, excludedKeys);
};

export const round = (num, prec) => {
  if (!num) {
    return 0;
  }

  return Math.round(num * Math.pow(10, prec)) / Math.pow(10, prec);
};
