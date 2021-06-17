import LINKS from 'utils/constants/links';

export const getNavLinks = (name, id) => [
  LINKS.PROJECT_MANAGEMENT,
  LINKS.PROJECTS,
  {
    HREF: LINKS.EDIT_PROJECT.HREF.replace(':id', id),
    TITLE: name || 'Not Found',
  },
];
