import React, { memo } from 'react';
import { Grid } from '@material-ui/core';

import ContainedButton from 'components/UI/Buttons/ContainedButton';
import PageHeader from 'parts/PageHeader';
import DetailLinkCard from 'parts/DetailLinkCard';
import ProjectForm from '../Shared/ProjectForm';
import StopDailyData from '../Shared/StopDailyData';
import MetaSystemTable from 'pages/MetaSystems/Shared/MetaSystemTable';
import PhasesListView from '../Shared/PhasesListView';
import LINKS from 'utils/constants/links';

import { NAV_LINKS } from './constants';
import { useEditProjectLogic } from './helpers';
import TrendChart from 'pages/MetaSystems/Shared/TrendChart';

const EditProject = () => {
  const { projectId, project, isPhasesVisible, getMode, onClickButton, metaSystems } = useEditProjectLogic();

  return (
    <>
      <PageHeader
        title={project?.name}
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
            <PhasesListView project={project} metaSystems={metaSystems} />
          </Grid>
        )}
        <Grid item xs={12}>
          <TrendChart title="System Trend Chart" projectId={projectId} />
        </Grid>
        <Grid item xs={12}>
          <MetaSystemTable records={metaSystems} projectId={projectId} />
        </Grid>
      </Grid>
    </>
  );
};

export default memo(EditProject);
