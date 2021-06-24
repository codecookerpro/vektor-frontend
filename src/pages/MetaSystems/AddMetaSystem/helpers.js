import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import LINKS from 'utils/constants/links';

const getNavLinks = (name, id) => [
  LINKS.PROJECT_MANAGEMENT,
  LINKS.PROJECTS,
  {
    HREF: LINKS.EDIT_PROJECT.HREF.replace(':id', id),
    TITLE: name || 'Not Found',
  },
];

const useNavLinks = () => {
  const { id } = useParams();

  const { results: projects } = useSelector(({ projects }) => projects);

  const { name } = useMemo(() => projects.find(({ _id }) => _id === id) || {}, [id, projects]);

  return getNavLinks(name, id);
};

export default useNavLinks;
