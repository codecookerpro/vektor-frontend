import React, { memo, useEffect, useState, useMemo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';

import PageHeader from 'parts/PageHeader';
import DetailLinkCard from 'parts/DetailLinkCard';
import MetaSystemForm from '../Shared/MetaSystemForm';
import GanttChart from '../Shared/GanttChart';
import DeliverableGraph from '../Shared/DeliverableGraph';
import DeliverableTable from '../Shared/DeliverableTable';
import InitDialog from '../Shared/InitDialog';
import SelectDialog from '../Shared/SelectDialog';

import LINKS from 'utils/constants/links';
import { FORM_MODE } from 'utils/constants';
import { initDeliverables, readMetaSystem, updateDeliverable } from 'redux/actions/metaSystem';
import { restrict } from 'utils/helpers/utility';

const EditMetaSystem = () => {
  const { systemId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [formMode, setFormMode] = useState(FORM_MODE.view);
  const [initDlg, showInitDlg] = useState(false);
  const [selectDlg, showSelectDlg] = useState(false);

  const metaSystem = useSelector((state) => state.projects.metaSystems.find((s) => s._id === systemId) || {});
  const { title, editable } = useMemo(() => {
    const title = formMode === FORM_MODE.view ? 'View System' : LINKS.EDIT_META_SYSTEM.TITLE;
    const editable = formMode === FORM_MODE.update;
    return { title, editable };
  }, [formMode]);

  const NAV_LINKS = useMemo(
    () => [
      LINKS.PROJECT_MANAGEMENT,
      LINKS.PROJECTS,
      {
        TITLE: LINKS.EDIT_PROJECT.TITLE,
        HREF: LINKS.EDIT_PROJECT.HREF.replace(':id', metaSystem.project),
      },
    ],
    [metaSystem]
  );

  // eslint-disable-next-line
  useEffect(() => dispatch(readMetaSystem()), []);

  useEffect(() => {
    if (!metaSystem) {
      return;
    }

    const dNum = metaSystem.mainSystem.deliverables.length;
    if (formMode === FORM_MODE.update && dNum === 0) {
      showInitDlg(true);
    }
  }, [formMode, metaSystem]);

  const handleInitDlgClose = () => showInitDlg(false);
  const handleWithTemplate = () => {
    showInitDlg(false);
    showSelectDlg(true);
  };
  const handleFromScratch = () => {
    showInitDlg(false);
  };
  const handleSelectDlgClose = () => showSelectDlg(false);
  const handleSelectTemplate = (template) => {
    showSelectDlg(false);
    dispatch(initDeliverables({ _id: metaSystem.mainSystem._id, deliverables: template.deliverables }));
  };
  const handleRowChange = (data) => {
    const mainId = metaSystem.mainSystem._id;
    dispatch(updateDeliverable({ ...restrict(data, ['_id', 'plannedHours', 'workedHours', 'start', 'end']), mainId }));
  };

  const handleOnDetail = () => {
    const deliverableChartLink = LINKS.DELIVERABLE_TREND_CHART.HREF;
    history.push(deliverableChartLink.replace(':projectId', metaSystem.project).replace(':systemId', systemId));
  };

  return (
    <>
      <PageHeader title={title} links={NAV_LINKS} />
      {metaSystem && (
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <MetaSystemForm system={metaSystem} mode={formMode} setFormMode={setFormMode} />
          </Grid>
          <Grid item xs={12}>
            <GanttChart deliverables={metaSystem.mainSystem.deliverables} />
          </Grid>
          <Grid item xs={12}>
            <DeliverableGraph editable={editable} mainSystem={metaSystem.mainSystem} />
          </Grid>
          <Grid item xs={12}>
            <DeliverableTable editable={editable} deliverables={metaSystem.mainSystem.deliverables} onRowChange={handleRowChange} />
          </Grid>
          <Grid item xs={12}>
            <DetailLinkCard title="Deliverable Trend Chart" onDetail={handleOnDetail} />
          </Grid>
        </Grid>
      )}
      <InitDialog open={initDlg} onClose={handleInitDlgClose} onTemplate={handleWithTemplate} onScratch={handleFromScratch} />
      <SelectDialog open={selectDlg} onClose={handleSelectDlgClose} onSelect={handleSelectTemplate} />
    </>
  );
};

export default memo(EditMetaSystem);
