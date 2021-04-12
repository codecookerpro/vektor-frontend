import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core';

import { getProjects } from 'redux/actions/projects';
import VektorChip from 'components/VektorChip';
import LinkButton from 'components/UI/Buttons/LinkButton';
import VektorTableContainer from 'parts/Tables/VektorTableContainer';
import * as TABLE_ENVIRONMENTS from 'utils/constants/table-environments';
import LINKS from 'utils/constants/links';
import results from 'utils/temp/projects';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'organization', label: 'Organization', minWidth: 100 },
  { id: 'number', label: 'Number', minWidth: 170 },
  { id: 'finished', label: 'Finished', minWidth: 170 },
  { id: 'status', label: 'Status', minWidth: 170 },
];

const ProjectsTable = () => {
  const dispatch = useDispatch()

  const { results: data } = useSelector(state => state.projects)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(
    TABLE_ENVIRONMENTS.ROWS_PER_PAGE
  );

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch])

  console.log(data)
  return (
    <Card>
      <CardContent>
        <Typography variant='h5' color='textPrimary' gutterBottom>
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
          {(rowsPerPage > 0
            ? results.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )
            : results
          ).map((row) => (
            <TableRow key={row.id}>
              <TableCell component='th' scope='row'>
                <LinkButton to={LINKS.EDIT_PROJECT.HREF.replace(':id', row.id)}>
                  {row.name}
                </LinkButton>
              </TableCell>
              <TableCell>{row.organization.name || ''}</TableCell>
              <TableCell>{row.number}</TableCell>
              <TableCell>
                {row.finished ? (
                  <VektorChip label='Finished' color='success' />
                ) : (
                  <VektorChip label='Not Finished' color='error' />
                )}
              </TableCell>
              <TableCell>{row.status * 100}%</TableCell>
            </TableRow>
          ))}
        </VektorTableContainer>
      </CardContent>
    </Card>
  );
};

export default memo(ProjectsTable);
