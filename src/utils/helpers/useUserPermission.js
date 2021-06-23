import { useSelector } from 'react-redux';

import { PERMISSION_TYPES } from 'utils/constants';

const useUserPermissions = () => {
  const { permissions } = useSelector(({ auth }) => {
    const {
      currentUser: { permissions },
    } = auth;

    return { permissions };
  });

  const isAdmin = permissions === PERMISSION_TYPES.admin;

  return { permissions, isAdmin };
};

export default useUserPermissions;
