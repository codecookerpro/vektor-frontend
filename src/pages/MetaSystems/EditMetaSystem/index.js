import React, { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';

import PageHeader from 'parts/PageHeader';
import MetaSystemForm from '../Shared/MetaSystemForm';
import LINKS from 'utils/constants/links';
import { FORM_MODE } from 'utils/constants';
import { readMetaSystem } from 'redux/actions/metaSystem';

const NAV_LINKS = [LINKS.PROJECT_MANAGEMENT, LINKS.PROJECTS];

const EditMetaSystem = () => {
  const { project, system } = useParams();
  const dispatch = useDispatch();
  const metaSystem = useSelector(({ projects: { metaSystems } }) => {
    if (metaSystems[project]) {
      return metaSystems[project].find((ms) => ms._id === system);
    }
    return null;
  });

  useEffect(() => dispatch(readMetaSystem(project)), [dispatch, project]);

  if (!metaSystem) {
    return null;
  }

  return (
    <>
      <PageHeader title={LINKS.EDIT_META_SYSTEM.TITLE} links={NAV_LINKS} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <MetaSystemForm system={metaSystem} mode={FORM_MODE.update} />
        </Grid>
      </Grid>
    </>
  );
};

export default memo(EditMetaSystem);
