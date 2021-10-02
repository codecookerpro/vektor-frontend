import React, { memo, useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';

import PageHeader from 'parts/PageHeader';
import MetaSystemForm from '../Shared/MetaSystemForm';
import GanttChart from '../Shared/GanttChart';
import DeliverableGraph from '../Shared/DeliverableGraph';
import DeliverableTable from '../Shared/DeliverableTable';
import InitDialog from '../Shared/InitDialog';
import SelectDialog from '../Shared/SelectDialog';

import LINKS from 'utils/constants/links';
import { FORM_MODE } from 'utils/constants';
import { initDeliverables, readMetaSystem, updateDeliverable } from 'redux/actions/metaSystem';
import { isEmpty, restrict } from 'utils/helpers/utility';
import TrendChart from '../Shared/TrendChart';
import { getProjects } from 'redux/actions/projects';

const EditMetaSystem = () => {
  const { projectId, systemId, mainSystemId } = useParams();
  const dispatch = useDispatch();
  const [formMode, setFormMode] = useState(FORM_MODE.view);
  const [initDlg, showInitDlg] = useState(false);
  const [selectDlg, showSelectDlg] = useState(false);

  const metaSystem = useSelector(
    (state) => state.projects.metaSystems.find((s) => (systemId !== '_' && s._id === systemId) || s.mainSystem._id === mainSystemId) || {}
  );
  const project = useSelector((state) => state.projects.results.find((p) => p._id === projectId));
  const systemTrend = useSelector((state) =>
    state.projects.systemTrends[metaSystem.project]?.find((t) => t.metaSystem === systemId || t.system === mainSystemId)
  );
  const departments = useSelector((state) => state.organizations.results.find((o) => o._id === metaSystem.organization)?.departments || []);
  const users = useSelector((state) => state.users.results);
  const editable = useMemo(() => formMode === FORM_MODE.update, [formMode]);

  const NAV_LINKS = useMemo(
    () => [
      LINKS.PROJECT_MANAGEMENT,
      LINKS.PROJECTS,
      {
        TITLE: project?.name,
        HREF: LINKS.EDIT_PROJECT.HREF.replace(':id', metaSystem.project),
      },
    ],
    [metaSystem, project]
  );

  useEffect(() => {
    dispatch(readMetaSystem({ system: systemId !== '_' && systemId, mainSystem: mainSystemId !== '_' && mainSystemId }));
    dispatch(getProjects({ filter: { _id: projectId } }));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isEmpty(metaSystem)) {
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
    dispatch(
      updateDeliverable({
        ...restrict(data, [
          '_id',
          'plannedHours',
          'workedHours',
          'start',
          'end',
          'completion',
          'status',
          'department',
          'activity',
          'resource',
          'approver',
          'reviewer',
        ]),
        mainId,
      })
    );
  };

  return (
    <>
      <PageHeader title={metaSystem.name} links={NAV_LINKS} />
      {isEmpty(metaSystem) || (
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <MetaSystemForm system={metaSystem} mode={formMode} setFormMode={setFormMode} />
          </Grid>
          <Grid item xs={12}>
            <GanttChart deliverables={metaSystem.mainSystem.deliverables} />
          </Grid>
          <Grid item xs={12}>
            <DeliverableGraph editable={editable} mainSystem={metaSystem.mainSystem} differentialWeight={metaSystem.differentialWeight} />
          </Grid>
          <Grid item xs={12}>
            <TrendChart title="Deliverable Trend Chart" projectId={metaSystem.project} systemId={metaSystem._id} />
          </Grid>
          <Grid item xs={12}>
            <DeliverableTable
              deliverables={metaSystem.mainSystem.deliverables}
              mainSystem={metaSystem.mainSystem._id}
              systemTrend={systemTrend}
              departments={departments}
              users={users}
              onRowChange={handleRowChange}
            />
          </Grid>
        </Grid>
      )}
      <InitDialog open={initDlg} onClose={handleInitDlgClose} onTemplate={handleWithTemplate} onScratch={handleFromScratch} />
      <SelectDialog open={selectDlg} onClose={handleSelectDlgClose} onSelect={handleSelectTemplate} />
    </>
  );
};

export default memo(EditMetaSystem);
