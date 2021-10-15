import React from 'react';
import { TableCell, TableRow, IconButton, Checkbox } from '@material-ui/core';
import { FileText, BarChart2 } from 'react-feather';
import _ from 'lodash';

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
      <span>{_.round(data.status)}%</span>
      <IconButton style={{ float: 'right', margin: -12 }} onClick={onChartButtonClick}>
        <BarChart2 />
      </IconButton>
    </TableCell>
    <TableCell>{_.round(data.calculated.lapsed, 2)}</TableCell>
    <TableCell>{_.round(data.calculated.differential, 2)}</TableCell>
    <TableCell>{_.round(data.calculated.effort, 2)}</TableCell>
    <TableCell>{_.round(data.calculated.EV)}%</TableCell>
    <TableCell>{_.round(data.calculated.PV)}%</TableCell>
    <TableCell>{_.round(data.calculated.weight, 2)}</TableCell>
    <TableCell>{_.round(data.calculated.systemPV)}%</TableCell>
    <TableCell>{_.round(data.calculated.systemStatus)}%</TableCell>
    <TableCell>{_.round(data.calculated.systemEV)}%</TableCell>
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
        <FileText color={data.notes.length ? 'black' : 'lightgrey'} />
      </IconButton>
    </TableCell>
  </TableRow>
);

export default ReadOnlyRow;
