import React, { memo } from 'react';
import { Grid } from '@material-ui/core';

import ContainedButton from 'components/UI/Buttons/ContainedButton';
import PageHeader from 'parts/PageHeader';
import DetailLinkCard from 'parts/DetailLinkCard';
import ProjectForm from '../Shared/ProjectForm';
import StopDailyData from '../Shared/StopDailyData';
import ProjectSystemsTable from '../Shared/ProjectSystemsTable';
import PhasesListView from '../Shared/PhasesListView';
import LINKS from 'utils/constants/links';

import { NAV_LINKS } from './constants';
import { useEditProjectLogic } from './helpers';

const EditProject = () => {
  const { project, isPhasesVisible, getMode, onClickButton } = useEditProjectLogic();

  return (
    <>
      <PageHeader
        title={LINKS.EDIT_PROJECT.TITLE}
        links={NAV_LINKS}
        leftElement={<ContainedButton onClick={onClickButton(LINKS.PROJECT_HISTORY.HREF)}>History</ContainedButton>}
      />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <ProjectForm mode={getMode} project={project} />
        </Grid>
        <Grid item xs={12}>
          <StopDailyData project={project} />
        </Grid>
        <Grid item xs={12}>
          <DetailLinkCard title="Phases" onDetail={onClickButton(LINKS.PROJECT_PHASES.HREF)} />
        </Grid>
        {isPhasesVisible && (
          <Grid item xs={12}>
            <PhasesListView phases={project.phases} />
          </Grid>
        )}
        <Grid item xs={12}>
          <DetailLinkCard title="System Trend Chart" onDetail={onClickButton(LINKS.SYSTEM_TREND_CHART.HREF)} />
        </Grid>
        <Grid item xs={12}>
          <ProjectSystemsTable />
        </Grid>
      </Grid>
    </>
  );
};

export default memo(EditProject);
