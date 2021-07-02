import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Card, CardHeader, CardContent, TableCell, TableRow } from '@material-ui/core';
import LinkButton from 'components/UI/Buttons/LinkButton';
import VektorTableContainer from 'parts/Tables/VektorTableContainer';

import LINKS from 'utils/constants/links';

import { useFilter, usePagination, useUserPermission } from 'utils/hooks';
import { getWorkflowTemplates } from 'redux/actions/workflowTemplates';

const columns = [
  { id: 'name', label: 'Name', minWidth: 130 },
  { id: 'organization', label: 'Organization', minWidth: 130 },
];

const WorkflowTemplatesTable = () => {
  const dispatch = useDispatch();

  const templates = useSelector((state) => state.workflowTemplates.results);
  const count = useSelector((state) => state.workflowTemplates.pagination.count);
  const organizations = useSelector((state) => state.organizations.results);
  const [orgFilterComp, orgFilter] = useFilter({ items: organizations, label: 'organization' });
  const { page, setPage, rowsPerPage, setRowsPerPage, pagination } = usePagination();
  const { isAdmin } = useUserPermission();

  // eslint-disable-next-line
  useEffect(() => dispatch(getWorkflowTemplates({ ...pagination, filter: { organization: orgFilter || undefined } })), [pagination, orgFilter]);

  const getOrganizationName = (_id) => {
    const organization = organizations.find((item) => item._id === _id);
    return organization?.name || '';
  };

  return (
    <Card>
      <CardHeader title={`${count} templates`} action={isAdmin && orgFilterComp} />
      <CardContent>
        <VektorTableContainer
          columns={columns}
          rowCounts={count}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        >
          {templates.map((row) => (
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
