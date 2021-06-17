const setColumn = (visible) =>
  visible
    ? [
        { id: 'Checkbox', label: 'checkbox', minWidth: 100 },
        { id: 'organization', label: 'Organization', minWidth: 170 },
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'system', label: 'System', minWidth: 170 },
        { id: 'fullContractName', label: 'Full Contract Name', minWidth: 170 },
        { id: 'projectName', label: 'Project Name', minWidth: 170 },
        { id: 'vendorName', label: 'Vendor Name', minWidth: 170 },
      ]
    : [
        { id: 'Checkbox', label: 'checkbox', minWidth: 100 },
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'system', label: 'System', minWidth: 170 },
        { id: 'fullContractName', label: 'Full Contract Name', minWidth: 170 },
        { id: 'projectName', label: 'Project Name', minWidth: 170 },
        { id: 'vendorName', label: 'Vendor Name', minWidth: 170 },
      ];

export default setColumn;
