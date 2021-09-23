import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const useReportFiltersLogic = (isAdmin, filter, setFilter) => {
  const { projectsData, metaSystemsFilter, organizationsData } = useSelector(({ projects, organizations, auth, dashboards }) => {
    const { results: organizationsData } = organizations;
    const { metaSystemList: metaSystemsFilter, projectList: projectsData } = dashboards;
    const {
      currentUser: { organization: userOrganization },
    } = auth;

    return {
      userOrganization,
      projectsData,
      metaSystemsFilter,
      organizationsData: [{ _id: '', name: '---' }, ...organizationsData],
    };
  });
  const projects = useMemo(() => {
    const projects = isAdmin ? projectsData.filter(({ organization }) => organization === filter?.organization) : projectsData;

    return [{ _id: '', name: '---' }, ...projects];
  }, [filter?.organization, isAdmin, projectsData]);
  const metaSystems = useMemo(() => [{ _id: '', name: '---' }, ...metaSystemsFilter], [metaSystemsFilter]);

  const inputHandler = ({ target: { name, value } }) => {
    setFilter((filter) => ({
      ...filter,
      [name]: value,
    }));
  };

  return {
    organizationsData,
    projects,
    metaSystems,
    inputHandler,
  };
};

export default useReportFiltersLogic;
