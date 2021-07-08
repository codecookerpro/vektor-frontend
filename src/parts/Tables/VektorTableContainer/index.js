import { memo, useState, useMemo, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableContainer } from '@material-ui/core';

import VektorTableHeader from 'parts/Tables/VektorTableHeader';
import VektorTableFooter from 'parts/Tables/VektorTableFooter';
import { noop, SORT_DIRS } from 'utils/constants';

const useStyles = makeStyles(() => ({
  table: {
    minWidth: 800,
  },
}));

const VektorTableContainer = ({ columns, rowCounts, page, setPage, rowsPerPage, setRowsPerPage, children, onSort = noop }) => {
  const { search, pathname } = useLocation();
  const history = useHistory();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const colOfUrl = useMemo(() => params.get('s__col'), [params]);
  const dirOfUrl = useMemo(() => params.get('s__dir'), [params]);

  const classes = useStyles();
  const [order, setOrder] = useState(dirOfUrl || SORT_DIRS.asc);
  const [orderBy, setOrderBy] = useState(colOfUrl);

  // eslint-disable-next-line
  useEffect(() => onSort(colOfUrl, dirOfUrl), []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === SORT_DIRS.asc;
    const nextOrder = isAsc ? SORT_DIRS.desc : SORT_DIRS.asc;
    setOrder(nextOrder);
    setOrderBy(property);
    onSort(property, nextOrder);

    params.set('s__col', property);
    params.set('s__dir', nextOrder);
    history.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="custom pagination table">
        <VektorTableHeader columns={columns} onRequestSort={handleRequestSort} order={order} orderBy={orderBy} />
        <TableBody>{children}</TableBody>
        <VektorTableFooter
          colSpan={columns.length}
          rowCounts={rowCounts}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      </Table>
    </TableContainer>
  );
};

export default memo(VektorTableContainer);
