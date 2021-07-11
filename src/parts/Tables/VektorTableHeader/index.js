import { memo, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TableHead, TableCell, TableRow, TableSortLabel } from '@material-ui/core';
import { SORT_DIRS } from 'utils/constants';

const useStyles = makeStyles(() => ({
  label: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  sticky: (props) => ({
    position: 'fixed',
    top: props.stickyTop,
    backgroundColor: 'white',
    width: props.stickyWidth,
    overflowX: 'hidden',
    zIndex: 99999,
  }),
}));

const VektorTableHeader = ({ columns, onRequestSort, order, orderBy, sticky, scrollX, stickyTop, stickyWidth }) => {
  const classes = useStyles({
    stickyWidth,
    stickyTop,
  });
  const ref = useRef(null);

  const createSortHandler = (columnId) => (event) => {
    onRequestSort(event, columnId);
  };

  useEffect(() => {
    if (sticky && ref.current) {
      ref.current.scrollTo(scrollX, stickyTop);
    }
  });

  return (
    <TableHead ref={ref} className={sticky ? classes.sticky : ''}>
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
            {column.sortable ? (
              <TableSortLabel
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : SORT_DIRS.asc}
                onClick={createSortHandler(column.id)}
              >
                {column.label}
              </TableSortLabel>
            ) : (
              column.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default memo(VektorTableHeader);
