import { useMemo, useState } from 'react';
import { SORT_DIRS } from 'utils/constants';
import { get } from 'lodash';

const createDefaultSorter = (column, dir) => (a, b) => {
  if (!column) {
    return 1;
  }

  const v1 = get(a, column.split('.')) || '#';
  const v2 = get(b, column.split('.')) || '#';

  if (v1 > v2) {
    return dir === SORT_DIRS.asc ? 1 : -1;
  } else if (v1 === v2) {
    return 0;
  } else {
    return dir === SORT_DIRS.asc ? -1 : 1;
  }
};

const useTableSort = (rows, sorter = createDefaultSorter) => {
  const [sortCol, setSortColumn] = useState(null);
  const [sortDir, setSortDir] = useState(SORT_DIRS.none);

  const handleSort = (col, dir) => {
    setSortColumn(col);
    setSortDir(dir);
  };

  // eslint-disable-next-line
  const sortedRows = useMemo(() => rows.sort(sorter(sortCol, sortDir)), [sortCol, sortDir, rows]);

  return { sortedRows, handleSort, sortCol, sortDir };
};

export default useTableSort;
