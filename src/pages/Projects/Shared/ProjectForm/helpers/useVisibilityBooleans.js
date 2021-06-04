import { useSelector } from 'react-redux';

import { PERMISSION_TYPE } from 'utils/constants/permissions';

export const useVisibilityBooleans = (organization, mode) => {
  const { permissions } = useSelector(({ auth }) => auth.currentUser);

  const isOrganizationVisible = permissions === PERMISSION_TYPE.ADMIN;
  const isSupervizorVisible = isOrganizationVisible && Boolean(organization);

  return { isOrganizationVisible, isSupervizorVisible };
};
