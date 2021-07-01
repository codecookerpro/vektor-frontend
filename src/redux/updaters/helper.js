export const updatePool = (oldSet, newSet) =>
  newSet.reduce((acc, updated) => {
    const old = acc.find((old) => old._id === updated._id);
    if (old) {
      return acc.map((old) => (old._id === updated._id ? updated : old));
    } else {
      return [...acc, updated];
    }
  }, oldSet);
