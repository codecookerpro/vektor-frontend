import { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableContainer } from "@material-ui/core";

import VektorTableHeader from "parts/Tables/VektorTableHeader";

const useStyles = makeStyles(() => ({
  table: {
    minWidth: 800,
  },
}));

const VektorSubTableContainer = ({ columns, children }) => {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="custom pagination table">
        <VektorTableHeader columns={columns} />
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default memo(VektorSubTableContainer);
