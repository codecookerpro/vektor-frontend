import { useState, useMemo } from 'react';
import { DEFAULT_ROWS_PER_PAGE } from 'utils/constants';
import { paginate } from 'utils/helpers/utility';

const usePagination = (records = []) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const pagination = useMemo(
    () => ({
      skip: page * rowsPerPage,
      limit: rowsPerPage,
    }),
    [page, rowsPerPage]
  );
  const pageRecords = useMemo(() => paginate(records, pagination.skip, pagination.limit), [records, pagination]);

  return {
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    pageRecords,
    pagination,
  };
};

export default usePagination;
