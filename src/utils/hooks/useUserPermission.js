import { useSelector } from 'react-redux';
import { PERMISSION_TYPES } from 'utils/constants';

const useUserPermissions = () => {
  const userInfo = useSelector((state) => state.auth.currentUser);
  const isAdmin = userInfo.permissions === PERMISSION_TYPES.admin;

  return { isAdmin, ...userInfo };
};

export default useUserPermissions;
