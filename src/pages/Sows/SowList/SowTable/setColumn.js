const setColumn = (visible) =>
  visible
    ? [
        { id: 'organization', label: 'Organization', minWidth: 170, sortable: true },
        { id: 'name', label: 'Name', minWidth: 170, sortable: true },
        { id: 'system', label: 'System', minWidth: 170, sortable: false },
        { id: 'initiationPhase.fullContractName', label: 'Full Contract Name', minWidth: 170, sortable: true },
        { id: 'projectName', label: 'Project Name', minWidth: 170, sortable: false },
        { id: 'initiationPhase.vendorName', label: 'Vendor Name', minWidth: 170, sortable: true },
      ]
    : [
        { id: 'name', label: 'Name', minWidth: 170, sortable: true },
        { id: 'system', label: 'System', minWidth: 170, sortable: false },
        { id: 'initiationPhase.fullContractName', label: 'Full Contract Name', minWidth: 170, sortable: true },
        { id: 'projectName', label: 'Project Name', minWidth: 170, sortable: false },
        { id: 'initiationPhase.vendorName', label: 'Vendor Name', minWidth: 170, sortable: true },
      ];

export default setColumn;
