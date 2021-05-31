import { useSelector } from 'react-redux';

const useAllowedRoutes = (routes) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  return routes.filter(({ role }) => !role || (role && role.indexOf(currentUser.permissions) >= 0));
};

export default useAllowedRoutes;
