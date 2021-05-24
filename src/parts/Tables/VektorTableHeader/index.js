import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TableHead, TableCell, TableRow } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  label: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
}));

const VektorTableHeader = ({ columns }) => {
  const classes = useStyles();

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }} className={classes.label}>
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default memo(VektorTableHeader);
