import React, { memo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardHeader, CardContent, TableCell, TableRow, Grid } from '@material-ui/core';

import LinkButton from 'components/UI/Buttons/LinkButton';
import VektorTableContainer from 'parts/Tables/VektorTableContainer';
import LINKS from 'utils/constants/links';
import setColumn from './setColumn';
import { useFilter, usePagination, useUserPermission } from 'utils/hooks';
import { getSOWs, setSelectedSOW } from 'redux/actions/sowAction';
import { readMetaSystem } from 'redux/actions/metaSystem';
import { SORT_DIRS } from 'utils/constants';

const SowTable = () => {
  const dispatch = useDispatch();
  const sows = useSelector((state) => state.sows.results);
  const organizations = useSelector((state) => state.organizations.results);
  const projects = useSelector((state) => state.projects.results);
  const systems = useSelector((state) => state.projects.metaSystems);

  const { isAdmin } = useUserPermission();
  const columns = setColumn(isAdmin);

  const { page, setPage, rowsPerPage, setRowsPerPage, pagination } = usePagination(sows);
  const [orgFilterComp, organizationFilter] = useFilter({ items: organizations, label: 'organization' });
  const [sysFilterComp, systemFilter] = useFilter({ items: systems, label: 'system' });
  const [sortString, setSortString] = useState(null);

  useEffect(() => {
    const params = {
      filter: {
        organization: organizationFilter || undefined,
        metaSystem: systemFilter || undefined,
      },
      ...pagination,
      sort: sortString || undefined,
    };

    dispatch(getSOWs(params));
    // eslint-disable-next-line
  }, [page, rowsPerPage, organizationFilter, systemFilter, sortString]);

  // eslint-disable-next-line
  useEffect(() => dispatch(readMetaSystem()), []);

  const getOrganizationName = (_id) => {
    const organization = organizations.find((item) => item._id === _id);
    return organization?.name || '';
  };
  const getProjectName = (_id) => {
    const project = projects.find((item) => item._id === _id);
    return project?.name || '';
  };

  const setSow = async (sow) => {
    await dispatch(setSelectedSOW(sow));
  };

  const handleSort = (col, dir) => {
    setSortString(`${dir === SORT_DIRS.desc ? '-' : ''}${col}`);
  };

  return (
    <Card>
      <CardHeader
        title={`${sows.length} SOWs`}
        action={
          <Grid container spacing={4}>
            {isAdmin && <Grid item>{orgFilterComp}</Grid>}
            <Grid item>{sysFilterComp}</Grid>
          </Grid>
        }
      />
      <CardContent>
        <VektorTableContainer
          columns={columns}
          rowCounts={sows.length}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          onSort={handleSort}
        >
          {sows.map((row) => (
            <TableRow key={row._id}>
              {isAdmin && (
                <TableCell component="th" scope="row">
                  <LinkButton to={LINKS.EDIT_SOW.HREF.replace(':id', row._id)} onClick={() => setSow(row)}>
                    {getOrganizationName(row.organization)}
                  </LinkButton>
                </TableCell>
              )}
              <TableCell>
                {isAdmin ? (
                  row.name
                ) : (
                  <LinkButton to={LINKS.EDIT_SOW.HREF.replace(':id', row._id)} onClick={() => setSow(row)}>
                    {row.name}
                  </LinkButton>
                )}
              </TableCell>
              <TableCell>{row.metaSystem}</TableCell>
              <TableCell>{row?.initiationPhase?.contractName || '-'}</TableCell>
              <TableCell>{getProjectName(row.project)}</TableCell>
              <TableCell>{row?.initiationPhase?.vendorName || '-'}</TableCell>
            </TableRow>
          ))}
        </VektorTableContainer>
      </CardContent>
    </Card>
  );
};

export default memo(SowTable);
