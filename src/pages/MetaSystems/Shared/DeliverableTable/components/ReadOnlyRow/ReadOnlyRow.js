import React from 'react';
import { TableCell, TableRow, IconButton, Checkbox } from '@material-ui/core';
import { FileText, BarChart2 } from 'react-feather';

const ReadOnlyRow = ({ data, onNoteButtonClick, onChartButtonClick }) => (
  <TableRow id={data._id}>
    <TableCell>{data.name}</TableCell>
    <TableCell>{data.predecessors}</TableCell>
    <TableCell>{data.plannedHours}</TableCell>
    <TableCell>{data.workedHours}</TableCell>
    <TableCell>{data.start}</TableCell>
    <TableCell>{data.end}</TableCell>
    <TableCell>{data.completion}</TableCell>
    <TableCell>
      <span>{data.status}%</span>
      <IconButton style={{ float: 'right', margin: -12 }} onClick={onChartButtonClick}>
        <BarChart2 />
      </IconButton>
    </TableCell>
    <TableCell>{data.calculated.lapsed}</TableCell>
    <TableCell>{data.calculated.differential}</TableCell>
    <TableCell>{data.calculated.effort}</TableCell>
    <TableCell>{data.calculated.EV}%</TableCell>
    <TableCell>{data.calculated.PV}%</TableCell>
    <TableCell>{data.calculated.weight}</TableCell>
    <TableCell>{data.calculated.systemPV}%</TableCell>
    <TableCell>{data.calculated.systemStatus}%</TableCell>
    <TableCell>{data.calculated.systemEV}%</TableCell>
    <TableCell>
      <Checkbox checked={data.activity} />
    </TableCell>
    <TableCell>{data.department}</TableCell>
    <TableCell>
      {data.resource.map((label) => (
        <React.Fragment key={label}>
          <span>{label}</span>
          <br />
        </React.Fragment>
      ))}
    </TableCell>
    <TableCell>
      {data.approver.map((label) => (
        <React.Fragment key={label}>
          <span>{label}</span>
          <br />
        </React.Fragment>
      ))}
    </TableCell>
    <TableCell>
      {data.reviewer.map((label) => (
        <React.Fragment key={label}>
          <span>{label}</span>
          <br />
        </React.Fragment>
      ))}
    </TableCell>
    <TableCell>
      <IconButton onClick={onNoteButtonClick} style={{ margin: -12 }}>
        <FileText color={data.note ? 'black' : 'lightgrey'} />
      </IconButton>
    </TableCell>
  </TableRow>
);

export default ReadOnlyRow;
