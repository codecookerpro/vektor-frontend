import { useState, useMemo } from 'react';
import { DEFAULT_ROWS_PER_PAGE } from 'utils/constants';
import { pagenate } from 'utils/helpers/utility';

const usePagenation = (records) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const pageRecords = useMemo(() => pagenate(records, rowsPerPage, page), [records, rowsPerPage, page]);

  return {
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    pageRecords,
  };
};

export default usePagenation;
