import React, { memo, useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

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
  const [initDlgShow, setInitDlgShow] = useState(false);
  const [selectDlgShow, setSelectDlgShow] = useState(false);
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
            <DeliverableGraph deliverables={metaSystem.mainSystem.deliverables} />
          </Grid>
          <Grid item xs={12}>
            <DeliverableTable deliverables={metaSystem.mainSystem.deliverables} />
          </Grid>
        </Grid>
      )}
      {/* <Dialog open={initDlgShow} onClose={() => setInitDlgShow(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title" className={classes.titleText}>
          Delete Connector
        </DialogTitle>
        <DialogContent>Are you sure to delete this connector?</DialogContent>
        <DialogActions className={classes.actions}>
          <Button onClick={() => setToggled(false)} color="primary" variant="contained">
            Cancel
          </Button>
          <Button onClick={onDelete} color="primary" variant="contained" className={classes.deleteButton} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog> */}
    </>
  );
};

export default memo(EditMetaSystem);
