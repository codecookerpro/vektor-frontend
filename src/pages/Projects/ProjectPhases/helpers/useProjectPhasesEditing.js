import { useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { createProjectPhase, updateProjectPhase, deleteProjectPhase } from 'redux/actions/projects';
import { ACTIONS } from 'pages/Projects/helpers';

const useProjectPhasesEditing = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [phases, setPhases] = useState([]);
  const [editingPhase, setEditingPhase] = useState(null);
  const [activeAction, setActiveAction] = useState('');

  const { results: projects } = useSelector(({ projects }) => projects);

  const project = useMemo(() => projects.find((item) => item._id === id), [id, projects]);
  const isEditingHeader = (orderIndex) => editingPhase?.orderIndex === orderIndex && activeAction === ACTIONS.RENAME;

  useEffect(() => {
    if (Boolean(project)) {
      setPhases(project.phases);
    }
  }, [project]);

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

  const onChangePhase = ({ value, name }, index) => {
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
    };
    delete updatedPhase['id'];

    const isCompleted = await dispatch(updateProjectPhase(updatedPhase));

    if (isCompleted) {
      setEditingPhase({});
      setActiveAction('');
    }
  };

  return {
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
  };
};

export default useProjectPhasesEditing;
