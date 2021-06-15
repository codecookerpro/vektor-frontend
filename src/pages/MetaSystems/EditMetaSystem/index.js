import React, { memo, useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';

import PageHeader from 'parts/PageHeader';
import MetaSystemForm from '../Shared/MetaSystemForm';
import DeliverableGraph from '../Shared/DeliverableGraph';
import DeliverableTable from '../Shared/DeliverableTable';

import LINKS from 'utils/constants/links';
import { FORM_MODE } from 'utils/constants';
import { readMetaSystem } from 'redux/actions/metaSystem';

const NAV_LINKS = [LINKS.PROJECT_MANAGEMENT, LINKS.PROJECTS];

const EditMetaSystem = () => {
  const { project, system } = useParams();
  const dispatch = useDispatch();
  const [formMode, setFormMode] = useState(FORM_MODE.view);
  const metaSystem = useSelector(({ projects: { metaSystems } }) => {
    if (metaSystems[project]) {
      return metaSystems[project].find((ms) => ms._id === system);
    }
    return null;
  });
  const title = useMemo(() => (formMode === FORM_MODE.view ? 'View System' : LINKS.EDIT_META_SYSTEM.TITLE), [formMode]);

  useEffect(() => dispatch(readMetaSystem(project)), [dispatch, project]);

  return (
    <>
      <PageHeader title={title} links={NAV_LINKS} />
      {metaSystem && (
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <MetaSystemForm system={metaSystem} mode={formMode} setFormMode={setFormMode} />
          </Grid>
          <Grid item xs={12}>
            <DeliverableGraph />
          </Grid>
          <Grid item xs={12}>
            <DeliverableTable deliverables={metaSystem.mainSystem.deliverables} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default memo(EditMetaSystem);
