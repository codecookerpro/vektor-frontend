import React, { memo, useState, useMemo, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';

import ContainedButton from 'components/UI/Buttons/ContainedButton';
import PageHeader from 'parts/PageHeader';
import DetailLinkCard from 'parts/DetailLinkCard';
import ProjectForm from '../Shared/ProjectForm';
import StopDailyData from '../Shared/StopDailyData';
import ProjectSystemsTable from '../Shared/ProjectSystemsTable';
import PhasesListView from '../Shared/PhasesListView';
import LINKS from 'utils/constants/links';
import users from 'utils/temp/users';
import results from 'utils/temp/projects';
import { isEmpty } from 'utils/helpers/utility';

const NAV_LINKS = [LINKS.PROJECT_MANAGEMENT, LINKS.PROJECTS];

const EditProject = () => {
  const { id } = useParams();
  const history = useHistory();

  const [selectedOrganization, setSelectedOrganization] = useState('');

  const project = useMemo(() => results.find((item) => item.id === id), [id]);

  useEffect(() => {
    if (!isEmpty(project)) {
      setSelectedOrganization(project.organization.id);
    }
  }, [project]);

  const userList = useMemo(() => users?.filter((user) => user?.organization.id === selectedOrganization), [selectedOrganization]);

  const linkHandler = (href) => () => {
    history.push(href.replace(':id', id));
  };

  return (
    <>
      <PageHeader
        title={LINKS.EDIT_PROJECT.TITLE}
        links={NAV_LINKS}
        leftElement={<ContainedButton onClick={linkHandler(LINKS.PROJECT_HISTORY.HREF)}>History</ContainedButton>}
      />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <ProjectForm users={userList} project={project} setSelectedOrganization={setSelectedOrganization} />
        </Grid>
        <Grid item xs={12}>
          <StopDailyData project={project} />
        </Grid>
        <Grid item xs={12}>
          <DetailLinkCard title="Phases" onDetail={linkHandler(LINKS.PROJECT_PHASES.HREF)} />
        </Grid>
        <Grid item xs={12}>
          <PhasesListView />
        </Grid>
        <Grid item xs={12}>
          <DetailLinkCard title="System Trend Chart" onDetail={linkHandler(LINKS.SYSTEM_TREND_CHART.HREF)} />
        </Grid>
        <Grid item xs={12}>
          <ProjectSystemsTable />
        </Grid>
      </Grid>
    </>
  );
};

export default memo(EditProject);
