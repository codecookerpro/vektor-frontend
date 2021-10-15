import { TableCell, TableRow, IconButton, TextField } from '@material-ui/core';
import FilterSelect from 'components/UI/Selects/FilterSelect';
import { Edit, CheckCircle } from '@material-ui/icons';
import VektorCheckbox from 'components/UI/VektorCheckbox';
import _ from 'lodash';

const EditableRow = ({ data, departments, users, editable, onEdit, onCellChange }) => (
  <TableRow key={data._id}>
    <TableCell>{data.name}</TableCell>
    <TableCell>{data.predecessors}</TableCell>
    <TableCell>
      <TextField
        type="number"
        name="plannedHours"
        InputProps={{
          inputProps: { min: '0', max: '100', step: '1' },
        }}
        onChange={onCellChange}
        value={data.plannedHours}
        disabled={!editable}
      />
    </TableCell>
    <TableCell>
      <TextField
        type="number"
        name="workedHours"
        InputProps={{
          inputProps: { min: '0', max: '100', step: '1' },
        }}
        onChange={onCellChange}
        value={data.workedHours}
        disabled={!editable}
      />
    </TableCell>
    <TableCell>
      <TextField
        id="start"
        name="start"
        type="date"
        value={data.start}
        onChange={onCellChange}
        InputLabelProps={{
          shrink: true,
        }}
        disabled={!editable}
      />
    </TableCell>
    <TableCell>
      <TextField
        id="end"
        name="end"
        type="date"
        value={data.end}
        onChange={onCellChange}
        InputLabelProps={{
          shrink: true,
        }}
        disabled={!editable}
      />
    </TableCell>
    <TableCell>
      <TextField
        id="completion"
        name="completion"
        type="date"
        value={data.completion}
        onChange={onCellChange}
        InputLabelProps={{
          shrink: true,
        }}
        disabled={!editable}
      />
    </TableCell>
    <TableCell>
      <TextField
        type="number"
        name="status"
        InputProps={{
          inputProps: { min: '0', max: '100', step: '1' },
        }}
        onChange={onCellChange}
        value={_.round(data.status)}
        disabled={!editable}
      />
    </TableCell>
    <TableCell>{_.round(data.calculated.lapsed, 2)}</TableCell>
    <TableCell>{_.round(data.calculated.differential, 2)}</TableCell>
    <TableCell>{_.round(data.calculated.effort, 2)}</TableCell>
    <TableCell>{_.round(data.calculated.EV)}%</TableCell>
    <TableCell>{_.round(data.calculated.PV)}%</TableCell>
    <TableCell>{_.round(data.calculated.weight)}</TableCell>
    <TableCell>{_.round(data.calculated.systemPV)}%</TableCell>
    <TableCell>{_.round(data.calculated.systemStatus)}%</TableCell>
    <TableCell>{_.round(data.calculated.systemEV)}%</TableCell>
    <TableCell>
      <VektorCheckbox
        onChange={(e) => onCellChange({ target: { name: 'activity', value: e.target.checked } })}
        checked={data.activity}
        disabled={!editable}
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
        disabled={!editable}
        onChange={onCellChange}
        value={data.department}
      />
    </TableCell>
    <TableCell>
      <FilterSelect
        fullWidth
        multiple
        placeholder="Select users"
        items={users.filter((u) => u.department === data.department)}
        name="resource"
        keys={{
          label: 'name',
          value: '_id',
        }}
        disabled={!editable}
        onChange={onCellChange}
        value={data.resource}
      />
    </TableCell>
    <TableCell>
      <FilterSelect
        fullWidth
        placeholder="Select department"
        items={departments}
        multiple
        name="approver"
        keys={{
          label: 'label',
          value: '_id',
        }}
        disabled={!editable}
        onChange={onCellChange}
        value={data.approver}
      />
    </TableCell>
    <TableCell>
      <FilterSelect
        fullWidth
        placeholder="Select department"
        items={departments}
        multiple
        name="reviewer"
        keys={{
          label: 'label',
          value: '_id',
        }}
        disabled={!editable}
        onChange={onCellChange}
        value={data.reviewer}
      />
    </TableCell>
    <TableCell>
      <IconButton aria-label="edit" onClick={onEdit}>
        {editable ? <CheckCircle /> : <Edit />}
      </IconButton>
    </TableCell>
  </TableRow>
);

export default EditableRow;
