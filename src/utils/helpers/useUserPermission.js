import { useSelector } from 'react-redux';

import { PERMISSION_TYPE } from '../constants';

const useUserPermissions = () => {
  const { permissions } = useSelector(({ auth }) => {
    const {
      currentUser: { permissions },
    } = auth;

    return { permissions };
  });

  const isAdmin = permissions === PERMISSION_TYPE.ADMIN;

  return { permissions, isAdmin };
};

export default useUserPermissions;
