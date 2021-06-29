import React, { memo, useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Card, CardHeader, CardContent, TableCell, TableRow } from '@material-ui/core';
import LinkButton from 'components/UI/Buttons/LinkButton';
import VektorTableContainer from 'parts/Tables/VektorTableContainer';

import LINKS from 'utils/constants/links';

import { useFilter, usePagenation, useUserPermission } from 'utils/hooks';
import { getWorkflowTemplates } from 'redux/actions/workflowTemplates';

const columns = [
  { id: 'name', label: 'Name', minWidth: 130 },
  { id: 'organization', label: 'Organization', minWidth: 130 },
];

const WorkflowTemplatesTable = () => {
  const dispatch = useDispatch();

  const templates = useSelector((state) => state.workflowTemplates.results);
  const organizations = useSelector((state) => state.organizations.results);
  const [filter, setFilter] = useState(null);
  const filteredTemplates = useMemo(() => {
    if (filter) {
      return templates.filter((t) => t.organization === filter);
    } else {
      return templates;
    }
  }, [filter, templates]);
  const { page, setPage, rowsPerPage, setRowsPerPage, pageRecords } = usePagenation(filteredTemplates);
  const filterComponent = useFilter(organizations, 'organization', setFilter);
  const { isAdmin } = useUserPermission();

  // eslint-disable-next-line
  useEffect(() => dispatch(getWorkflowTemplates(true)), []);

  const getOrganizationName = (_id) => {
    const organization = organizations.find((item) => item._id === _id);
    return organization?.name || '';
  };

  return (
    <Card>
      <CardHeader title={`${filteredTemplates.length} templates`} action={isAdmin && filterComponent} />
      <CardContent>
        <VektorTableContainer
          columns={columns}
          rowCounts={templates.length}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        >
          {pageRecords.map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                <LinkButton to={LINKS.EDIT_WORKFLOW_TEMPLATE.HREF.replace(':id', row._id)}>{row.name}</LinkButton>
              </TableCell>
              <TableCell>{getOrganizationName(row.organization)}</TableCell>
            </TableRow>
          ))}
        </VektorTableContainer>
      </CardContent>
    </Card>
  );
};

export default memo(WorkflowTemplatesTable);
