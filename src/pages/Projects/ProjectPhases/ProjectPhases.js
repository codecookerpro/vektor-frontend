import React, { memo, useCallback } from 'react';
import { Grid, TextField, IconButton } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';

import PageHeader from 'parts/PageHeader';
import LINKS from 'utils/constants/links';
import ProjectPhasesTable from '../Shared/ProjectPhasesTable';
import PhaseBox from '../Shared/PhasesListView/PhaseBox';
import PhaseItem from '../Shared/PhasesListView/PhaseItem';

import { ACTIONS_DATA, ALLOWED_ROLES } from './constants';
import useStyles from './styles';
import { useProjectPhasesEditing, getNavLinks } from './helpers';

const ProjectPhases = () => {
  const { phaseHeader } = useStyles();
  const {
    projectId,
    project,
    phases,
    editingPhase,
    activeAction,
    currentMetaSystems,
    isEditingHeader,
    onChangePhase,
    onCompleteEditing,
    onActionClick,
    onHeaderClick,
    setEditingPhase,
  } = useProjectPhasesEditing();

  const { permissions } = useSelector(({ auth }) => auth.currentUser);
  const isEditingVisible = ALLOWED_ROLES.includes(permissions);

  const renderTitleComponent = useCallback(
    (orderIndex, arrayIndex, name) =>
      isEditingHeader(orderIndex) ? (
        <div className={phaseHeader}>
          <TextField name="name" value={editingPhase.name} onChange={({ target }) => onChangePhase(target, arrayIndex)} autoFocus />
          <IconButton aria-label="done" onClick={onCompleteEditing}>
            <DoneIcon fontSize="small" />
          </IconButton>
        </div>
      ) : (
        name
      ),
    [editingPhase?.name, isEditingHeader, onChangePhase, onCompleteEditing, phaseHeader]
  );

  const returnItemsForColumn = (newProjectPhase) => {
    return currentMetaSystems
      .filter(({ projectPhase }) => projectPhase === newProjectPhase)
      .map((ms) => (
        <Grid key={ms._id} item xs={12}>
          <PhaseItem item={ms} projectId={project._id} canDrag={false} />
        </Grid>
      ));
  };

  return (
    <>
      <PageHeader title={`${LINKS.PROJECT_PHASES.TITLE}: ${project?.name || 'Not Found'}`} links={getNavLinks(project?.name, projectId)} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <DndProvider backend={HTML5Backend}>
            <Grid container spacing={6}>
              {phases.map(({ _id, orderIndex, name }, idx) => (
                <Grid key={orderIndex} item xs={12} sm={6} md={3}>
                  <PhaseBox
                    orderIndex={orderIndex}
                    phase={{ name: renderTitleComponent(orderIndex, idx, name) }}
                    phaseActions={isEditingVisible && ACTIONS_DATA}
                    fields={currentMetaSystems && returnItemsForColumn(_id)}
                    moveItem={() => null}
                    onActionClick={onActionClick}
                  />
                </Grid>
              ))}
              {isEditingVisible && (
                <Grid item xs={12} sm={6} md={3}>
                  <PhaseBox phase={{ name: '+ Add new phase' }} fields={[]} moveItem={() => null} onHeaderClick={onHeaderClick} />
                </Grid>
              )}
            </Grid>
          </DndProvider>
        </Grid>
        <Grid item xs={12}>
          <ProjectPhasesTable
            activeAction={activeAction}
            editingPhase={editingPhase}
            phases={phases}
            setEditingPhase={setEditingPhase}
            onActionClick={isEditingVisible && onActionClick}
            onChangePhase={onChangePhase}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default memo(ProjectPhases);
