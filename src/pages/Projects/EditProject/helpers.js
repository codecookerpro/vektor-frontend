import { useEffect, useMemo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { PROJECT_MODES } from '../constants';
import { PERMISSION_TYPE } from 'utils/constants/permissions';
import { readMetaSystem } from 'redux/actions/metaSystem';
import { getSystemHistory } from 'redux/actions/systems';

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

    return { projects: results, permissions, metaSystems: metaSystems[id] };
  });

  useEffect(() => {
    dispatch(readMetaSystem(id, true));
    dispatch(getSystemHistory(id, true));
  }, [dispatch, id]);

  const project = useMemo(() => projects.find((item) => item._id === id), [id, projects]);
  const getMode = useMemo(() => {
    switch (permissions) {
      case PERMISSION_TYPE.SUPERVISOR:
      case PERMISSION_TYPE.ADMIN:
        return PROJECT_MODES.EDITING;
      default:
        return PROJECT_MODES.VIEWING;
    }
  }, [permissions]);
  const isPhasesVisible = project && project?.phases.length > 0;

  const onClickButton = (href) => () => {
    history.push(href.replace(':id', id));
  };

  return { project, isPhasesVisible, getMode, onClickButton, metaSystems };
};
