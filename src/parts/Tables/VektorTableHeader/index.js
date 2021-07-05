import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TableHead, TableCell, TableRow, TableSortLabel } from '@material-ui/core';
import { SORT_DIRS } from 'utils/constants';

const useStyles = makeStyles(() => ({
  label: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
}));

const VektorTableHeader = ({ columns, onRequestSort, order, orderBy }) => {
  const classes = useStyles();

  const createSortHandler = (columnId) => (event) => {
    onRequestSort(event, columnId);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{
              minWidth: column.minWidth,
              maxWidth: column.maxWidth,
            }}
            className={classes.label}
            sortDirection={orderBy === column.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : SORT_DIRS.asc}
              onClick={createSortHandler(column.id)}
            >
              {column.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default memo(VektorTableHeader);
