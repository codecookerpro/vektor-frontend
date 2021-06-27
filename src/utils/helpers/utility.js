const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};

const keyMirror = (obj) =>
  Object.freeze(
    Object.keys(obj).reduce(
      (acc, key) => ({
        ...acc,
        [key]: obj[key] ? obj[key] : key,
      }),
      {}
    )
  );

const restrict = (obj, keys = []) =>
  keys.reduce((acc, key) => {
    return {
      ...acc,
      [key]: obj[key],
    };
  }, {});

const exclude = (obj, keys = []) => {
  const excludedKeys = Object.keys(obj).filter((key) => !keys.includes(key));
  return restrict(obj, excludedKeys);
};

export { isEmpty, keyMirror, restrict, exclude };
