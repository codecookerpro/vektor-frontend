import { useSelector } from 'react-redux';

import { PERMISSION_TYPES } from 'utils/constants';

const useUserPermissions = (allowedPermissions) => {
  const userInfo = useSelector((state) => state.auth.currentUser);
  const isAdmin = userInfo.permissions === PERMISSION_TYPES.admin;
  const included = allowedPermissions.includes(userInfo.permissions);
  const excluded = !included;

  return { isAdmin, ...userInfo, included, excluded };
};

export default useUserPermissions;
