import { useSelector } from 'react-redux';

import { PERMISSION_TYPES } from 'utils/constants';

const useUserPermissions = (...permissionList) => {
  const { permissions } = useSelector(({ auth }) => auth.currentUser);

  const isAdmin = permissions === PERMISSION_TYPES.admin;
  const included = PERMISSION_TYPES.subset(permissionList).includes(permissions);
  const excluded = !included;

  return { permissions, isAdmin, included, excluded };
};

export default useUserPermissions;
