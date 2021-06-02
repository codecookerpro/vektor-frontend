import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { PERMISSION_TYPE } from 'utils/constants/permissions';

export const useVisibilityBooleans = (organization) => {
  const { permissions } = useSelector(({ auth }) => auth.currentUser);

  const isOrganizationVisible = permissions === PERMISSION_TYPE.ADMIN;
  const isSupervizorVisible = isOrganizationVisible && organization !== '';

  return { isOrganizationVisible, isSupervizorVisible };
};
