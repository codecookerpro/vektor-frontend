import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, TableCell, TableRow, Typography } from '@material-ui/core';

import VektorChip from 'components/VektorChip';
import LinkButton from 'components/UI/Buttons/LinkButton';
import VektorTableContainer from 'parts/Tables/VektorTableContainer';
import { DEFAULT_ROWS_PER_PAGE } from 'utils/constants';
import LINKS from 'utils/constants/links';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'organization', label: 'Organization', minWidth: 100 },
  { id: 'number', label: 'Number', minWidth: 170 },
  { id: 'finished', label: 'Finished', minWidth: 170 },
  { id: 'status', label: 'Status', minWidth: 170 },
];

const ProjectsTable = () => {
  const { results } = useSelector((state) => state.projects);
  const organizations = useSelector((state) => state.organizations.results);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);

  const getOrganizationName = (_id) => {
    const organization = organizations.find((item) => item._id === _id);
    return organization?.name || '';
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" color="textPrimary" gutterBottom>
          {`${results.length} projects`}
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
                <LinkButton to={LINKS.EDIT_PROJECT.HREF.replace(':id', row._id)}>{row.name}</LinkButton>
              </TableCell>
              <TableCell>{getOrganizationName(row.organization)}</TableCell>
              <TableCell>{row.number}</TableCell>
              <TableCell>
                {row?.finished ? <VektorChip label="Finished" color="success" /> : <VektorChip label="Not Finished" color="error" />}
              </TableCell>
              <TableCell>{1 * 100}%</TableCell>
            </TableRow>
          ))}
        </VektorTableContainer>
      </CardContent>
    </Card>
  );
};

export default memo(ProjectsTable);
