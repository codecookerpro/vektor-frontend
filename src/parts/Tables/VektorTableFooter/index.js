import { memo, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TableFooter, TablePagination, TableRow } from '@material-ui/core';

import TablePaginationActions from 'parts/Tables/TablePaginationActions';

const useStyles = makeStyles((theme) => ({
  menuItem: {
    backgroundColor: `${theme.palette.background.primary} !important`,
  },
  selectIcon: {
    color: theme.palette.text.primary,
  },
}));

const VektorTableFooter = ({ colSpan, rowCounts, page, setPage, rowsPerPage, setRowsPerPage }) => {
  const classes = useStyles();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChangePage = useCallback(
    (event, newPage) => {
      setPage(newPage);
    },
    [setPage]
  );

  const handleChangeRowsPerPage = useCallback(
    (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    [setPage, setRowsPerPage]
  );

  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          colSpan={colSpan}
          count={rowCounts}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: { 'aria-label': 'rows per page' },
            native: true,
          }}
          classes={{
            menuItem: classes.menuItem,
            selectIcon: classes.selectIcon,
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </TableRow>
    </TableFooter>
  );
};

export default memo(VektorTableFooter);
