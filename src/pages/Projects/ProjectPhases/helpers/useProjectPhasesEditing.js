import { useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { readMetaSystem } from 'redux/actions/metaSystem';
import { createProjectPhase, updateProjectPhase, deleteProjectPhase } from 'redux/actions/projects';
import { ACTIONS } from 'pages/Projects/constants';
import { round } from 'utils/helpers/utility';

const useProjectPhasesEditing = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const [editingPhase, setEditingPhase] = useState(null);
  const [activeAction, setActiveAction] = useState('');

  const { results: projects, metaSystems } = useSelector(({ projects }) => projects);
  const project = useMemo(() => projects.find((item) => item._id === projectId), [projectId, projects]);
  const currentMetaSystems = useMemo(() => metaSystems.filter((m) => m.project === projectId), [projectId, metaSystems]);
  const isEditingHeader = (orderIndex) => editingPhase?.orderIndex === orderIndex && activeAction === ACTIONS.RENAME;
  const phases = useMemo(
    () =>
      (project?.phases || []).map((p) => {
        const phaseSystems = currentMetaSystems.filter((m) => m.projectPhase === p._id);
        if (phaseSystems.length) {
          const sum = phaseSystems.reduce((acc, system) => acc + parseFloat(system.mainSystem.status), 0);
          return {
            ...p,
            status: round(sum / phaseSystems.length, 2),
          };
        } else {
          return { ...p, status: 0 };
        }
      }),
    [project, currentMetaSystems]
  );

  useEffect(() => {
    dispatch(readMetaSystem({ project: projectId }));
  }, [dispatch, projectId]);

  const onHeaderClick = () => {
    const newPhase = {
      mainId: project._id,
      name: `New Phase ${phases.length + 1}`,
      plannedValue: 0,
      start: new Date(),
      end: new Date(),
      orderIndex: phases.length + 1,
    };

    dispatch(createProjectPhase(newPhase));
  };

  const onDeletePhase = async (index) => {
    const { _id } = phases.find(({ orderIndex }) => index === orderIndex);
    const removedPhase = { _id, mainId: project._id };

    await dispatch(deleteProjectPhase(removedPhase));
    setEditingPhase({});
  };

  const onActionClick = (action, idx) => {
    switch (action) {
      case ACTIONS.RENAME: {
        const activePhase = phases.find(({ orderIndex }) => idx === orderIndex);
        setActiveAction(action);
        setEditingPhase(activePhase);
        break;
      }
      case ACTIONS.DELETE: {
        onDeletePhase(idx);
        break;
      }
      case ACTIONS.EDIT: {
        const activePhase = phases.find(({ orderIndex }) => idx === orderIndex);
        setActiveAction(action);
        setEditingPhase(activePhase);
        break;
      }
      case ACTIONS.COMPLETE: {
        onCompleteEditing();
        break;
      }
      default:
        break;
    }
  };

  const onChangePhase = ({ value, name }) => {
    setEditingPhase((phase) => ({
      ...phase,
      [name]: value,
    }));
  };

  const onCompleteEditing = async () => {
    const plannedValue = Boolean(editingPhase.plannedValue) ? editingPhase.plannedValue : 0;

    const updatedPhase = {
      ...editingPhase,
      plannedValue,
      mainId: project._id,
      id: undefined,
      status: undefined,
    };

    const isCompleted = await dispatch(updateProjectPhase(updatedPhase));

    if (isCompleted) {
      setEditingPhase({});
      setActiveAction('');
    }
  };

  return {
    projectId,
    project,
    phases,
    editingPhase,
    currentMetaSystems,
    activeAction,
    isEditingHeader,
    onChangePhase,
    onCompleteEditing,
    onActionClick,
    onHeaderClick,
    setEditingPhase,
  };
};

export default useProjectPhasesEditing;
