import React, { memo, useMemo, useState } from 'react';
import { Card, CardHeader, CardContent, Button } from '@material-ui/core';
import { ColorButton } from 'components/UI/Buttons';
import moment from 'moment';

import VektorSubTableContainer from 'parts/Tables/VektorSubTableContainer';
import { useTableSort, useFocusElement } from 'utils/hooks';
import { EditableRow, NoteDialog, ReadOnlyRow, TrendChartDialog } from './components';
import { DELIVERABLE_TABLE_COLUMNS } from './constants';
import { noop } from 'utils/constants';

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
  const renderRows = useMemo(() => {
    if (editable) {
      return sortedRows.map((row, idx) => ({
        ...row,
        ...(idx === editIndex && editData),
        predecessors: row.predecessors.map((pre) => deliverables.find((d) => d._id === pre).name).join(', '),
        start: row.start && moment(row.start).format('YYYY-MM-DD'),
        end: row.end && moment(row.end).format('YYYY-MM-DD'),
        completion: row.completion && moment(row.completion).format('YYYY-MM-DD'),
      }));
    } else {
      return sortedRows
        .map((row, idx) => ({
          ...row,
          ...(idx === editIndex && editData),
          predecessors: row.predecessors.map((pre) => deliverables.find((d) => d._id === pre).name).join(', '),
          department: departments.find((d) => d._id === row.department)?.label,
          resource: row.resource.map((uid) => users.find((u) => u._id === uid)?.name),
          approver: row.approver.map((did) => departments.find((d) => d._id === did)?.label),
          reviewer: row.reviewer.map((did) => departments.find((d) => d._id === did)?.label),
        }))
        .map((row) => ({
          ...row,
          start: row.start && moment(row.start).format('YYYY-MM-DD'),
          end: row.end && moment(row.end).format('YYYY-MM-DD'),
          completion: row.completion && moment(row.completion).format('YYYY-MM-DD'),
        }));
    }
  }, [sortedRows, editIndex, editData, editable, deliverables, departments, users]);

  const columns = useMemo(() => {
    let columns = [...DELIVERABLE_TABLE_COLUMNS];
    if (editable) {
      columns = [...columns, { id: 'edit', label: '', minWidth: 70 }];
    } else {
      columns = [...columns, { id: 'note', label: '', minWidth: 70, sortable: false }];
    }

    return columns.map((c) => ({ ...c, sortable: c.sortable && !editable }));
  }, [editable]);

  const handleCellChange = ({ target: { value, name } }) => {
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

  const toggleNoteDialog = (idx) => {
    handleEditButton(idx);
    setToggledNoteDialog(true);
  };

  const handleNoteSave = () => {
    onRowChange(editData);
    setToggledNoteDialog(false);
  };

  const handleNoteClose = () => {
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

  const handleChartClose = () => {
    setToggledTrendChart(false);
  };

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
          {renderRows.map((row, idx) =>
            editable ? (
              <EditableRow
                key={row._id}
                data={row}
                editable={idx === editIndex}
                departments={departments}
                users={users}
                onCellChange={handleCellChange}
                onEdit={() => handleEditButton(idx)}
              />
            ) : (
              <ReadOnlyRow key={row._id} data={row} onNoteButtonClick={() => toggleNoteDialog(idx)} onChartButtonClick={() => showTrendChart(row)} />
            )
          )}
        </VektorSubTableContainer>
        <NoteDialog
          open={toggledNoteDialog}
          title={editData.name}
          departments={departments}
          onChange={handleCellChange}
          onSave={handleNoteSave}
          onClose={handleNoteClose}
          data={editData}
        />
        <TrendChartDialog open={toggledTrendChart} chartData={trendChartData} onClose={handleChartClose} />
      </CardContent>
    </Card>
  );
};

export default memo(DeliverableTable);
