export const NOTE_TABLE_COLUMNS = [
  { id: 'type', label: 'Type', minWidth: 100, sortable: true },
  { id: 'description', label: 'Description', minWidth: 300, sortable: true },
  { id: 'date', label: 'Date', minWidth: 100, sortable: true },
  { id: 'resource', label: 'Resource', minWidth: 100, sortable: true },
  { id: 'status', label: 'Status', minWidth: 50, sortable: true },
  { id: 'edit_button', label: '', minWidth: 50, sortable: false },
];

export const NOTE_TYPES = [
  { value: 'ACTION', label: 'Action' },
  { value: 'DECISIONS', label: 'Decisions' },
  { value: 'ESCALATIONS', label: 'Escalations' },
  { value: 'LESSONS_LEARNED', label: 'Lessons Learned' },
  { value: 'INFORMATION', label: 'Information' },
];
