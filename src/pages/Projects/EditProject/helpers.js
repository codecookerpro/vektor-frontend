import { useEffect, useMemo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { PROJECT_MODES } from '../constants';
import { PERMISSION_TYPES } from 'utils/constants';
import { readMetaSystem, getSystemHistory } from 'redux/actions/metaSystem';
import { getProjects } from 'redux/actions/projects';

export const useEditProjectLogic = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    projects,
    permissions,
    metaSystems = [],
  } = useSelector(({ projects, auth }) => {
    const {
      currentUser: { permissions },
    } = auth;
    const { results, metaSystems } = projects;

    return { projects: results, permissions, metaSystems: metaSystems.filter((m) => m.project === id) };
  });

  useEffect(() => {
    dispatch(getProjects({ filter: { _id: id } }));
    dispatch(readMetaSystem({ project: id }, true));
    dispatch(getSystemHistory(id, true));
    // eslint-disable-next-line
  }, []);

  const project = useMemo(() => projects.find((item) => item._id === id), [id, projects]);
  const getMode = useMemo(() => {
    switch (permissions) {
      case PERMISSION_TYPES.supervisor:
      case PERMISSION_TYPES.admin:
        return PROJECT_MODES.EDITING;
      default:
        return PROJECT_MODES.VIEWING;
    }
  }, [permissions]);
  const isPhasesVisible = project && project?.phases.length > 0;

  const onClickButton = (href) => () => {
    history.push(href.replace(':projectId', id));
  };

  return { projectId: id, project, isPhasesVisible, getMode, onClickButton, metaSystems };
};
