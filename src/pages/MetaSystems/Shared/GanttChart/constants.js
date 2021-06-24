export const GANTT_OPTIONS = {
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

export const GANTT_HEADER = [
  { type: 'string', label: 'Task ID' },
  { type: 'string', label: 'Task Name' },
  { type: 'date', label: 'Start Date' },
  { type: 'date', label: 'End Date' },
  { type: 'number', label: 'Duration' },
  { type: 'number', label: 'Percent Complete' },
  { type: 'string', label: 'Dependencies' },
];
