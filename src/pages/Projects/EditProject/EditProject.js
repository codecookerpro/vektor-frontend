import React, { memo } from 'react';
import { Grid } from '@material-ui/core';
import { Plus } from 'react-feather';

import ContainedButton from 'components/UI/Buttons/ContainedButton';
import PageHeader from 'parts/PageHeader';
import DetailLinkCard from 'parts/DetailLinkCard';
import ProjectForm from '../Shared/ProjectForm';
import StopDailyData from '../Shared/StopDailyData';
import MetaSystemTable from '../../MetaSystems/Shared/MetaSystemTable';
import PhasesListView from '../Shared/PhasesListView';
import LINKS from 'utils/constants/links';

import { NAV_LINKS } from './constants';
import { useEditProjectLogic } from './helpers';

const EditProject = () => {
  const { project, isPhasesVisible, getMode, onClickButton, metaSystems } = useEditProjectLogic();

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
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={8}>
              <DetailLinkCard title="System Trend Chart" onDetail={onClickButton(LINKS.SYSTEM_TREND_CHART.HREF)} />
            </Grid>
            <ContainedButton onClick={onClickButton(LINKS.ADD_META_SYSTEM.HREF.replace(':id', project?._id))}>
              <Plus /> Add System
            </ContainedButton>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <MetaSystemTable records={metaSystems} />
        </Grid>
      </Grid>
    </>
  );
};

export default memo(EditProject);
