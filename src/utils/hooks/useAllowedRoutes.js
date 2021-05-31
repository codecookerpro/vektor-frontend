import { useSelector } from 'react-redux';

const useAllowedRoutes = (routes) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  return routes.filter(({ roles }) => !roles || roles.includes(currentUser.permissions));
};

export default useAllowedRoutes;
