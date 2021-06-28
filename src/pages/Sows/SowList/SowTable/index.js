import React, { memo, useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardHeader, CardContent, TableCell, TableRow, Grid } from '@material-ui/core';

import LinkButton from 'components/UI/Buttons/LinkButton';
import VektorTableContainer from 'parts/Tables/VektorTableContainer';
import LINKS from 'utils/constants/links';
import setColumn from './setColumn';
import { useFilter, usePagenation, useUserPermission } from 'utils/hooks';
import { getSOWs, setSelectedSOW } from 'redux/actions/sowAction';
import { readMetaSystem } from 'redux/actions/metaSystem';

const SowTable = () => {
  const dispatch = useDispatch();
  const sows = useSelector((state) => state.sows.results);
  const organizations = useSelector((state) => state.organizations.results);
  const projects = useSelector((state) => state.projects.results);
  const systems = useSelector((state) => state.projects.metaSystems.raw || []);
  const { isAdmin } = useUserPermission();
  const columns = setColumn(isAdmin);
  const filteredSows = useMemo(() => {
    return sows;
  }, [sows]);
  const [organizationFilter, setOrganizationFilter] = useState(null);
  const [systemFilter, setSystemFilter] = useState(null);
  const { page, setPage, rowsPerPage, setRowsPerPage } = usePagenation(filteredSows);
  const orgFilterComp = useFilter(organizations, 'organization', setOrganizationFilter);
  const sysFilterComp = useFilter(systems, 'system', setSystemFilter);

  useEffect(() => {
    const pagination = {
      skip: page * rowsPerPage,
      limit: rowsPerPage,
    };
    const filter = {
      organization: organizationFilter || undefined,
      metaSystem: systemFilter || undefined,
    };

    dispatch(getSOWs(filter, pagination));
    // eslint-disable-next-line
  }, [page, rowsPerPage, organizationFilter, systemFilter]);

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

  return (
    <Card>
      <CardHeader
        title={`${filteredSows.length} SOWs`}
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
          rowCounts={filteredSows.length}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        >
          {filteredSows.map((row) => (
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
