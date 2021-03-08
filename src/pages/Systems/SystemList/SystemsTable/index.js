import React, { memo, useState } from "react";
import {
  Card,
  CardContent,
  TableCell,
  TableRow,
  Checkbox,
  Typography,
} from "@material-ui/core";

import LinkButton from "components/UI/Buttons/LinkButton";
import VektorTableContainer from "parts/Tables/VektorTableContainer";
import * as TABLE_ENVIRONMENTS from "utils/constants/table-environments";
import LINKS from "utils/constants/links";
import results from "utils/temp/systems";

const columns = [
  { id: "name", label: "Name", minWidth: 130 },
  { id: "workflow", label: "Workflow", minWidth: 60 },
  { id: "project", label: "Project", minWidth: 60 },
  { id: "equipmentCategory", label: "Equipment category", minWidth: 90 },
  { id: "equipmentType", label: "Equipment type", minWidth: 90 },
  { id: "equipmentName", label: "Equipment name", minWidth: 90 },
  { id: "equipmentNumber", label: "Equipment number", minWidth: 90 },
  { id: "totalHours", label: "Total Planned Hours", minWidth: 40 },
  { id: "pv", label: "PV", minWidth: 25 },
  { id: "status", label: "Status", minWidth: 25 },
  { id: "effort", label: "Effort", minWidth: 25 },
  { id: "ev", label: "EV", minWidth: 25 },
];

const SystemsTable = ({ selectedItems, setSelectedItems }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(
    TABLE_ENVIRONMENTS.ROWS_PER_PAGE
  );

  const toggleHandler = (value) => () => {
    const currentIndex = selectedItems.findIndex(
      (item) => item.id === value.id
    );
    const newSelectedItems = [...selectedItems];

    if (currentIndex === -1) {
      newSelectedItems.push(value);
    } else {
      newSelectedItems.splice(currentIndex, 1);
    }

    setSelectedItems(newSelectedItems);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" color="textPrimary" gutterBottom>
          {`${results.length} systems`}
        </Typography>
        <VektorTableContainer
          columns={columns}
          rowCounts={results.length}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        >
          {(rowsPerPage > 0
            ? results.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : results
          ).map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                <div style={{ display: "flex" }}>
                  <Checkbox
                    inputProps={{ "aria-labelledby": `check-${row.id}` }}
                    checked={
                      selectedItems.findIndex(
                        (value) => row.id === value.id
                      ) !== -1
                    }
                    onChange={toggleHandler(row)}
                  />
                  <LinkButton
                    to={LINKS.EDIT_SYSTEM.HREF.replace(":id", row.id)}
                  >
                    {row.name}
                  </LinkButton>
                </div>
              </TableCell>
              <TableCell>{row.workflow.name || ""}</TableCell>
              <TableCell>{row.project.name || ""}</TableCell>
              <TableCell>{row.equipment.category || ""}</TableCell>
              <TableCell>{row.equipment.type || ""}</TableCell>
              <TableCell>{row.equipment.name || ""}</TableCell>
              <TableCell>{row.equipment.number || ""}</TableCell>
              <TableCell>{row.totalHours}</TableCell>
              <TableCell>{row.pv * 100}%</TableCell>
              <TableCell>{row.status * 100}%</TableCell>
              <TableCell>{row.effort * 100}%</TableCell>
              <TableCell>{row.ev * 100}%</TableCell>
            </TableRow>
          ))}
        </VektorTableContainer>
      </CardContent>
    </Card>
  );
};

export default memo(SystemsTable);
