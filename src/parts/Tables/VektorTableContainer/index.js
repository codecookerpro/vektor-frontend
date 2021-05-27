import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableContainer } from '@material-ui/core';

import VektorTableHeader from 'parts/Tables/VektorTableHeader';
import VektorTableFooter from 'parts/Tables/VektorTableFooter';

const useStyles = makeStyles(() => ({
  table: {
    minWidth: 800,
  },
}));

const VektorTableContainer = ({ columns, rowCounts, page, setPage, rowsPerPage, setRowsPerPage, children }) => {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="custom pagination table">
        <VektorTableHeader columns={columns} />
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
