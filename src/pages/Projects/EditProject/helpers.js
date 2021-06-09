import { useMemo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { PROJECT_MODES } from 'utils/constants/projectModes';
import { PERMISSION_TYPE } from 'utils/constants/permissions';

export const useEditProjectLogic = () => {
  const { id } = useParams();
  const history = useHistory();

  const { projects, permissions } = useSelector(({ projects, auth }) => {
    const {
      currentUser: { permissions },
    } = auth;
    const { results } = projects;

    return { projects: results, permissions };
  });

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

  return { project, isPhasesVisible, getMode, onClickButton };
};
