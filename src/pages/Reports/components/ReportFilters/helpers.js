import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getMetaSystemsFilter, fetchMetaSystemsFilter } from 'redux/actions/metaSystem';

const useReportFiltersLogic = (isAdmin, filter, setFilter) => {
  const dispatch = useDispatch();

  const { projectsData, metaSystemsFilter, organizationsData, isMetaSystemsLoading } = useSelector(({ projects, organizations, auth }) => {
    const { results: projectsData, metaSystemsFilter, isMetaSystemsLoading } = projects;
    const { results: organizationsData } = organizations;
    const {
      currentUser: { organization: userOrganization },
    } = auth;

    return {
      userOrganization,
      projectsData,
      metaSystemsFilter,
      isMetaSystemsLoading,
      organizationsData: [{ _id: '', name: '---' }, ...organizationsData],
    };
  });
  const projects = useMemo(() => {
    const projects = isAdmin ? projectsData.filter(({ organization }) => organization === filter?.organization) : projectsData;

    return [{ _id: '', name: '---' }, ...projects];
  }, [filter?.organization, isAdmin, projectsData]);
  const metaSystems = useMemo(
    () => [{ _id: '', name: isMetaSystemsLoading ? 'Please wait...' : '---' }, ...metaSystemsFilter],
    [metaSystemsFilter, isMetaSystemsLoading]
  );

  useEffect(() => {
    const { project } = filter;
    if (project) {
      dispatch(fetchMetaSystemsFilter(project));
    } else {
      dispatch(getMetaSystemsFilter([]));
    }
  }, [filter]);

  const inputHandler = ({ target }) => {
    const { name, value } = target;

    switch (name) {
      case 'organization':
        setFilter(value ? { [name]: value } : {});
        break;
      case 'project':
        setFilter(({ organization }) => ({
          ...(organization && { organization }),
          ...(value && { [name]: value }),
        }));
        break;
      case 'metaSystem':
        setFilter(({ organization, project }) => ({
          organization,
          project,
          ...(value && { [name]: value }),
        }));
        break;
      default:
        break;
    }
  };

  return {
    organizationsData,
    projects,
    metaSystems,
    inputHandler,
  };
};

export default useReportFiltersLogic;
