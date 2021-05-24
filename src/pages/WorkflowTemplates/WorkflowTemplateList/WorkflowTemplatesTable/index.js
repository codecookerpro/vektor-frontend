import React, { memo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, TableCell, TableRow, Checkbox, Typography } from '@material-ui/core';

import { getWorkflowTemplates } from 'redux/actions/workflowTemplates';
import LinkButton from 'components/UI/Buttons/LinkButton';
import VektorTableContainer from 'parts/Tables/VektorTableContainer';
import * as TABLE_ENVIRONMENTS from 'utils/constants/table-environments';
import LINKS from 'utils/constants/links';

const columns = [
  { id: 'name', label: 'Name', minWidth: 130 },
  { id: 'organization', label: 'Organization', minWidth: 130 },
];

const WorkflowTemplatesTable = ({ selectedItems, setSelectedItems }) => {
  const dispatch = useDispatch();

  const { results = [] } = useSelector((state) => state.workflowTemplates);
  const organizations = useSelector((state) => state.organizations.results || []);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(TABLE_ENVIRONMENTS.ROWS_PER_PAGE);

  useEffect(() => {
    dispatch(getWorkflowTemplates());
  }, [dispatch]);

  const toggleHandler = (value) => () => {
    const currentIndex = selectedItems.findIndex((item) => item._id === value._id);
    const newSelectedItems = [...selectedItems];

    if (currentIndex === -1) {
      newSelectedItems.push(value);
    } else {
      newSelectedItems.splice(currentIndex, 1);
    }

    setSelectedItems(newSelectedItems);
  };

  const getOrganizationName = (_id) => {
    const organization = organizations.find((item) => item._id === _id);
    return organization?.name || '';
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" color="textPrimary" gutterBottom>
          {`${results.length} templates`}
        </Typography>
        <VektorTableContainer
          columns={columns}
          rowCounts={results.length}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        >
          {(rowsPerPage > 0 ? results.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : results).map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                <div style={{ display: 'flex' }}>
                  <Checkbox
                    inputProps={{ 'aria-labelledby': `check-${row._id}` }}
                    checked={selectedItems.findIndex((value) => row._id === value._id) !== -1}
                    onChange={toggleHandler(row)}
                  />
                  <LinkButton to={LINKS.EDIT_WORKFLOW_TEMPLATE.HREF.replace(':id', row._id)}>{row.name}</LinkButton>
                </div>
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
