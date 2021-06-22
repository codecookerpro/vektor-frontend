import { useSelector } from 'react-redux';

import { PERMISSION_TYPE } from 'utils/constants/permissions';
import { PROJECT_MODES } from 'pages/Projects/constants';

import { ALLOWED_ROLES } from '../constants';

const useVisibilityBooleans = (organization, mode) => {
  const { permissions } = useSelector(({ auth }) => auth.currentUser);

  const isViewingMode = mode === PROJECT_MODES.VIEWING;
  const isCreationMode = mode === PROJECT_MODES.CREATION;
  const isEditingMode = mode === PROJECT_MODES.EDITING;
  const isOrganizationVisible = (isCreationMode || isEditingMode) && permissions === PERMISSION_TYPE.ADMIN;
  const isSupervisorVisible = (isCreationMode && permissions !== PERMISSION_TYPE.SUPERVISOR && Boolean(organization)) || !isCreationMode;
  const isButtonEnabled = ALLOWED_ROLES.includes(permissions);

  return { isOrganizationVisible, isSupervisorVisible, isViewingMode, isCreationMode, isButtonEnabled };
};

export default useVisibilityBooleans;
