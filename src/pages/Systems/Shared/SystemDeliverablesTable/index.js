import React, { memo, useState } from "react";
import {
  Card,
  CardContent,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Calendar, Plus, Minus } from "react-feather";

import VektorSubTableContainer from "parts/Tables/VektorSubTableContainer";
import results from "utils/temp/system-deliverables";

const useStyles = makeStyles((theme) => ({
  title: {
    display: "flex",
    alignItems: "center",
  },
  openIcon: {
    cursor: "pointer",
    margin: theme.spacing(1),
    color: theme.custom.palette.lightGreen,
  },
  date: {
    display: "flex",
    alignItems: "center",
  },
}));

const columns = [
  { id: "dependency", label: "Deliverable Dependancy", minWidth: 170 },
  { id: "predecessors", label: "Predecessors", minWidth: 170 },
  { id: "plannedHours", label: "Planned Hours", minWidth: 100 },
  { id: "workedHours", label: "Worked Hours", minWidth: 100 },
  { id: "start", label: "Start", minWidth: 100 },
  { id: "end", label: "End", minWidth: 100 },
];

const SystemDeliverablesTable = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <Card>
      <CardContent>
        <Typography
          variant="h5"
          color="textPrimary"
          gutterBottom
          className={classes.title}
        >
          {open ? (
            <Minus
              className={classes.openIcon}
              onClick={() => setOpen(false)}
            />
          ) : (
            <Plus className={classes.openIcon} onClick={() => setOpen(true)} />
          )}
          Deliverables
        </Typography>
        {open && (
          <VektorSubTableContainer columns={columns}>
            {results.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.dependency || ""}</TableCell>
                <TableCell>{row.predecessors || ""}</TableCell>
                <TableCell>{row.plannedHours || ""}</TableCell>
                <TableCell>{row.workedHours || ""}</TableCell>
                <TableCell>
                  <div className={classes.date}>
                    <Calendar />
                    {row.start || ""}
                  </div>
                </TableCell>
                <TableCell>
                  <div className={classes.date}>
                    <Calendar />
                    {row.end || ""}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </VektorSubTableContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default memo(SystemDeliverablesTable);
