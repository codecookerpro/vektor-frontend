import sampleData from './sample_data.json';

export const header = [
  { type: 'string', label: 'Task ID' },
  { type: 'string', label: 'Task Name' },
  { type: 'date', label: 'Start Date' },
  { type: 'date', label: 'End Date' },
  { type: 'number', label: 'Duration' },
  { type: 'number', label: 'Percent Complete' },
  { type: 'string', label: 'Dependencies' },
];

export const deliverables = sampleData.deliverables.map((i) => {
  const dependencies = i.predecessors.length ? i.predecessors.join(',') : null;
  return [i._id, i.name, new Date(i.start), new Date(i.end), null, i.status, dependencies];
});

export const options = {
  width: '100%',
  gantt: {
    criticalPathEnabled: true,
    criticalPathStyle: {
      stroke: '#e64a19',
      strokeWidth: 5,
    },
    arrow: {
      width: 3,
      color: 'green',
      radius: 0,
    },
  },
};
