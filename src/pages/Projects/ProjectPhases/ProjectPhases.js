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
import ItemsDragLayer from '../Shared/PhasesListView/ItemsDragLayer';

import { ACTIONS_DATA, ALLOWED_ROLES } from './constants';
import useStyles from './styles';
import { useProjectPhasesEditing, getNavLinks } from './helpers';

const ProjectPhases = () => {
  const { phaseHeader } = useStyles();
  const {
    id,
    project,
    phases,
    editingPhase,
    activeAction,
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

  return (
    <>
      <PageHeader title={`${LINKS.PROJECT_PHASES.TITLE}: ${project?.name || 'Not Found'}`} links={getNavLinks(project?.name, id)} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <DndProvider backend={HTML5Backend}>
            <ItemsDragLayer />
            <Grid container spacing={6}>
              {phases.map(({ orderIndex, name }, idx) => (
                <Grid key={orderIndex} item xs={12} sm={6} md={3}>
                  <PhaseBox
                    orderIndex={orderIndex}
                    name={renderTitleComponent(orderIndex, idx, name)}
                    phaseActions={isEditingVisible && ACTIONS_DATA}
                    fields={[]}
                    moveItem={() => null}
                    onActionClick={onActionClick}
                  />
                </Grid>
              ))}
              {isEditingVisible && (
                <Grid item xs={12} sm={6} md={3}>
                  <PhaseBox name="+ Add new phase" fields={[]} moveItem={() => null} onHeaderClick={onHeaderClick} />
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
