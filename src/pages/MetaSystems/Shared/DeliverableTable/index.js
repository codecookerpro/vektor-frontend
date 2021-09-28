import React, { memo, useMemo, useState } from 'react';
import { Card, CardHeader, CardContent, TableCell, TableRow, IconButton, Checkbox, Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Edit, CheckCircle } from '@material-ui/icons';
import { FileText, BarChart2 } from 'react-feather';
import { Dialog, DialogTitle, DialogContent, DialogActions } from 'components/UI/VektorDialog';
import { ColorButton } from 'components/UI/Buttons';
import Chart from 'react-google-charts';
import { CHART_OPTIONS } from './constants';
import FilterSelect from 'components/UI/Selects/FilterSelect';

import VektorSubTableContainer from 'parts/Tables/VektorSubTableContainer';
import { noop } from 'utils/constants';
import moment from 'moment';
import useFocusElement from 'utils/hooks/useFocusElement';
import { round } from 'utils/helpers/utility';
import { useTableSort } from 'utils/hooks';
import VektorCheckbox from 'components/UI/VektorCheckbox';

const mainColumns = [
  { id: 'name', label: 'Deliverable', minWidth: 100, sortable: true },
  { id: 'predecessors', label: 'Predecessors', minWidth: 70, sortable: false },
  { id: 'plannedHours', label: 'Planned Hours', minWidth: 70, sortable: true },
  { id: 'workedHours', label: 'Worked Hours', minWidth: 70, sortable: true },
  { id: 'start', label: 'Start', minWidth: 120, sortable: true },
  { id: 'end', label: 'End', minWidth: 120, sortable: true },
  { id: 'completion', label: 'Completion', minWidth: 70, sortable: true },
  { id: 'status', label: 'status', minWidth: 70, sortable: true },
  { id: 'calculated.lapsed', label: 'lapsed', minWidth: 70, sortable: true },
  { id: 'calculated.differential', label: 'differential', minWidth: 70, sortable: true },
  { id: 'calculated.effort', label: 'effort', minWidth: 70, sortable: true },
  { id: 'calculated.EV', label: 'EV', minWidth: 70, sortable: true },
  { id: 'calculated.PV', label: 'PV', minWidth: 70, sortable: true },
  { id: 'calculated.weight', label: 'weight', minWidth: 70, sortable: true },
  { id: 'calculated.systemPV', label: 'System PV', minWidth: 70, sortable: true },
  { id: 'calculated.systemStatus', label: 'System Status', minWidth: 70, sortable: true },
  { id: 'calculated.systemEV', label: 'System EV', minWidth: 70, sortable: true },
  { id: 'activity', label: 'Activity', minWidth: 70, sortable: true },
  { id: 'department', label: 'Department', minWidth: 70, sortable: true },
  { id: 'resource', label: 'Resource', minWidth: 70, sortable: true },
  { id: 'note', label: '', minWidth: 70, sortable: false },
];

const DeliverableTable = ({ deliverables = [], systemTrend = {}, departments = [], users = [], onRowChange = noop }) => {
  useFocusElement(deliverables);

  const graphOrderRows = useMemo(() => deliverables.sort((a, b) => a.chartData.position.x - b.chartData.position.x), [deliverables]);
  const { sortedRows, handleSort } = useTableSort(graphOrderRows);
  const [editData, setEditData] = useState({});
  const [editIndex, setEditIndex] = useState(-1);
  const [editable, setEditable] = useState(false);
  const [toggledNoteDialog, setToggledNoteDialog] = useState(false);
  const [toggledTrendChart, setToggledTrendChart] = useState(false);
  const [trendChartData, setTrendChartData] = useState([]);

  const columns = useMemo(() => {
    let columns = [...mainColumns];
    if (editable) {
      columns = [...columns, { id: 'edit', label: '', minWidth: 70 }];
    }

    return columns.map((c) => ({ ...c, sortable: c.sortable && !editable }));
  }, [editable]);

  const handleFieldChange = ({ target: { value, name } }) => {
    const updatedData = { ...editData, [name]: value };

    if (name === 'department') {
      updatedData.resource = [];
    }

    setEditData(updatedData);
  };

  const handleEditButton = (idx) => {
    if (editIndex === idx) {
      setEditIndex(-1);
      onRowChange(editData);
    } else {
      setEditIndex(idx);
      setEditData(deliverables[idx]);
    }
  };
  const getFieldValue = (idx, name) => {
    const value = idx === editIndex ? editData[name] : sortedRows[idx][name];

    if (['start', 'end', 'completion'].includes(name)) {
      return value ? moment(value).format('YYYY-MM-DD') : '';
    } else {
      return value;
    }
  };
  const toggleNoteDialog = (idx) => {
    handleEditButton(idx);
    setToggledNoteDialog(true);
  };

  const handleNoteSave = (e) => {
    e.preventDefault();
    onRowChange(editData);
    setToggledNoteDialog(false);
  };

  const handleNoteClose = (e) => {
    e.preventDefault();
    setToggledNoteDialog(false);
  };

  const showTrendChart = (deliverable) => {
    const samples = systemTrend.samples
      .map((s) => ({ ...s, deliverable: s.deliverables.find((d) => d.deliverable === deliverable._id) }))
      .sort((a, b) => moment(a.date) > moment(b.date));
    const labels = ['Date', `${deliverable.name} EV`, `${deliverable.name} PV`];
    const data = samples.map(({ date, deliverable: { EV, PV } }) => [moment(date).format('YYYY/MM/DD'), EV, PV]);
    setTrendChartData([labels, ...data]);
    setToggledTrendChart(true);
  };

  const getPredecessors = (row) => row.predecessors.map((pre) => deliverables.find((d) => d._id === pre).name).join(', ');
  const isDisabled = (idx) => idx !== editIndex && editIndex >= 0;
  const isReadOnly = (idx) => idx !== editIndex;
  const EditableRow = (row, idx) => (
    <TableRow key={row._id}>
      <TableCell>{getFieldValue(idx, 'name')}</TableCell>
      <TableCell>{getPredecessors(row)}</TableCell>
      <TableCell>
        <TextField
          type="number"
          name="plannedHours"
          InputProps={{
            readOnly: isReadOnly(idx),
            inputProps: { min: '0', max: '100', step: '1' },
          }}
          onChange={handleFieldChange}
          value={getFieldValue(idx, 'plannedHours')}
          disabled={isDisabled(idx)}
        />
      </TableCell>
      <TableCell>
        <TextField
          type="number"
          name="workedHours"
          InputProps={{
            readOnly: isReadOnly(idx),
            inputProps: { min: '0', max: '100', step: '1' },
          }}
          onChange={handleFieldChange}
          value={getFieldValue(idx, 'workedHours')}
          disabled={isDisabled(idx)}
        />
      </TableCell>
      <TableCell>
        <TextField
          id="start"
          name="start"
          type="date"
          value={getFieldValue(idx, 'start')}
          onChange={handleFieldChange}
          InputLabelProps={{
            shrink: true,
            readOnly: isReadOnly(idx),
          }}
          disabled={isDisabled(idx)}
        />
      </TableCell>
      <TableCell>
        <TextField
          id="end"
          name="end"
          type="date"
          value={getFieldValue(idx, 'end')}
          onChange={handleFieldChange}
          InputLabelProps={{
            shrink: true,
            readOnly: isReadOnly(idx),
          }}
          disabled={isDisabled(idx)}
        />
      </TableCell>
      <TableCell>
        <TextField
          id="completion"
          name="completion"
          type="date"
          value={getFieldValue(idx, 'completion')}
          onChange={handleFieldChange}
          InputLabelProps={{
            shrink: true,
            readOnly: isReadOnly(idx),
          }}
          disabled={isDisabled(idx)}
        />
      </TableCell>
      <TableCell>
        <TextField
          type="number"
          name="status"
          InputProps={{
            readOnly: isReadOnly(idx),
            inputProps: { min: '0', max: '100', step: '1' },
          }}
          onChange={handleFieldChange}
          value={getFieldValue(idx, 'status')}
          disabled={isDisabled(idx)}
        />
      </TableCell>
      <TableCell>{round(row.calculated.lapsed, 2)}</TableCell>
      <TableCell>{round(row.calculated.differential, 2)}</TableCell>
      <TableCell>{round(row.calculated.effort, 2)}</TableCell>
      <TableCell>{round(row.calculated.EV, 2)}%</TableCell>
      <TableCell>{round(row.calculated.PV, 2)}%</TableCell>
      <TableCell>{round(row.calculated.weight, 2)}</TableCell>
      <TableCell>{round(row.calculated.systemPV, 2)}%</TableCell>
      <TableCell>{round(row.calculated.systemStatus, 2)}%</TableCell>
      <TableCell>{round(row.calculated.systemEV, 2)}%</TableCell>
      <TableCell>
        <VektorCheckbox
          onChange={(e) => handleFieldChange({ target: { name: 'activity', value: e.target.checked } })}
          checked={getFieldValue(idx, 'activity')}
          disabled={isReadOnly(idx)}
        />
      </TableCell>
      <TableCell>
        <FilterSelect
          fullWidth
          placeholder="Select department"
          items={departments}
          name="department"
          keys={{
            label: 'label',
            value: '_id',
          }}
          disabled={isReadOnly(idx)}
          onChange={handleFieldChange}
          value={getFieldValue(idx, 'department')}
        />
      </TableCell>
      <TableCell>
        <FilterSelect
          fullWidth
          multiple
          placeholder="Select users"
          items={users.filter((u) => u.department === getFieldValue(idx, 'department'))}
          name="resource"
          keys={{
            label: 'name',
            value: '_id',
          }}
          disabled={isReadOnly(idx)}
          onChange={handleFieldChange}
          value={getFieldValue(idx, 'resource')}
        />
      </TableCell>
      <TableCell>
        <IconButton aria-label="edit" onClick={() => handleEditButton(idx)}>
          {idx === editIndex ? <CheckCircle /> : <Edit />}
        </IconButton>
      </TableCell>
    </TableRow>
  );

  const ReadOnlyRow = (row, idx) => (
    <TableRow key={row._id} id={row._id}>
      <TableCell>{getFieldValue(idx, 'name')}</TableCell>
      <TableCell>{getPredecessors(row)}</TableCell>
      <TableCell>{getFieldValue(idx, 'plannedHours')}</TableCell>
      <TableCell>{getFieldValue(idx, 'workedHours')}</TableCell>
      <TableCell>{getFieldValue(idx, 'start')}</TableCell>
      <TableCell>{getFieldValue(idx, 'end')}</TableCell>
      <TableCell>{getFieldValue(idx, 'completion')}</TableCell>
      <TableCell>
        <span>{getFieldValue(idx, 'status')}%</span>
        <IconButton style={{ float: 'right', padding: 0 }} onClick={() => showTrendChart(row)}>
          <BarChart2 />
        </IconButton>
      </TableCell>
      <TableCell>{row.calculated.lapsed}</TableCell>
      <TableCell>{row.calculated.differential}</TableCell>
      <TableCell>{row.calculated.effort}</TableCell>
      <TableCell>{row.calculated.EV}%</TableCell>
      <TableCell>{row.calculated.PV}%</TableCell>
      <TableCell>{row.calculated.weight}</TableCell>
      <TableCell>{row.calculated.systemPV}%</TableCell>
      <TableCell>{row.calculated.systemStatus}%</TableCell>
      <TableCell>{row.calculated.systemEV}%</TableCell>
      <TableCell>
        <Checkbox checked={row.activity} />
      </TableCell>
      <TableCell>{departments.find((d) => d._id === row.department)?.label}</TableCell>
      <TableCell>
        {row.resource.map((uid) => (
          <React.Fragment key={uid}>
            <span>{users.find((u) => u._id === uid)?.name}</span>
            <br />
          </React.Fragment>
        ))}
      </TableCell>
      <TableCell>
        <IconButton onClick={() => toggleNoteDialog(idx)} style={{ padding: 0 }}>
          <FileText color={row.note ? 'black' : 'lightgrey'} />
        </IconButton>
      </TableCell>
    </TableRow>
  );

  return (
    <Card>
      <CardHeader
        title="Deliverables"
        action={
          editable ? (
            <Button variant="contained" colour="default" onClick={() => setEditable(false)}>
              DONE
            </Button>
          ) : (
            <ColorButton variant="contained" colour="lightGreen" onClick={() => setEditable(true)}>
              EDIT
            </ColorButton>
          )
        }
      />
      <CardContent>
        <VektorSubTableContainer columns={columns} onSort={handleSort} sticky={true}>
          {sortedRows.map((row, idx) => (editable ? EditableRow(row, idx) : ReadOnlyRow(row, idx)))}
        </VektorSubTableContainer>
        <Dialog open={toggledNoteDialog} onClose={handleNoteClose} fullWidth maxWidth="xs">
          <DialogTitle>Deliverables Note Dialog</DialogTitle>
          <DialogContent>
            <TextField
              multiline
              rows={5}
              name="note"
              label="Deliverable Note"
              fullWidth
              variant="outlined"
              value={editData?.note}
              onChange={handleFieldChange}
            />
          </DialogContent>
          <DialogActions>
            <ColorButton colour="red" autoFocus onClick={handleNoteSave}>
              Save
            </ColorButton>
            <ColorButton colour="lightGreen" onClick={handleNoteClose}>
              Cancel
            </ColorButton>
          </DialogActions>
        </Dialog>
        <Dialog open={toggledTrendChart} onClose={() => setToggledTrendChart(false)} fullWidth maxWidth="md">
          <DialogTitle>Deliverable Trend Chart</DialogTitle>
          <DialogContent>
            <Chart
              width="100%"
              height="600px"
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={trendChartData}
              options={CHART_OPTIONS}
            />
          </DialogContent>
          <DialogActions>
            <ColorButton colour="lightGreen" onClick={() => setToggledTrendChart(false)}>
              Close
            </ColorButton>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default memo(DeliverableTable);
