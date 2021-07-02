import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader, CardContent, TableCell, TableRow } from '@material-ui/core';

import VektorChip from 'components/VektorChip';
import LinkButton from 'components/UI/Buttons/LinkButton';
import VektorTableContainer from 'parts/Tables/VektorTableContainer';
import LINKS from 'utils/constants/links';

import { useFilter, useUserPermission, usePagination } from 'utils/hooks';
import { getProjects } from 'redux/actions/projects';
import { COLUMNS } from './constants';

const ProjectsTable = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.results);
  const count = useSelector((state) => state.projects.pagination.count);
  const organizations = useSelector((state) => state.organizations.results);
  const [orgFilterComp, orgFilter] = useFilter({ items: organizations, label: 'organization' });
  const { page, setPage, rowsPerPage, setRowsPerPage, pagination } = usePagination();
  const { isAdmin } = useUserPermission();

  const getOrganizationName = (_id) => organizations.find((item) => item._id === _id)?.name || '';
  useEffect(() => {
    dispatch(
      getProjects({
        filter: { organization: orgFilter || undefined },
        ...pagination,
      })
    );
    // eslint-disable-next-line
  }, [orgFilter, pagination]);

  return (
    <Card>
      <CardHeader title={`${count} projects`} action={isAdmin && orgFilterComp} />
      <CardContent>
        <VektorTableContainer
          columns={COLUMNS}
          rowCounts={count}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        >
          {projects.map((row) => (
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
