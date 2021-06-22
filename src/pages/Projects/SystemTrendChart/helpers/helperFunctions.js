import LINKS from 'utils/constants/links';
import { isEmpty } from 'utils/helpers/utility';

export const getNavLinks = (projectName, projectId, systemName, systemId) => [
  LINKS.PROJECT_MANAGEMENT,
  LINKS.PROJECTS,
  {
    HREF: LINKS.EDIT_PROJECT.HREF.replace(':id', projectId),
    TITLE: projectName || 'Not Found',
  },
  ...(!isEmpty(systemName)
    ? [
        {
          HREF: LINKS.EDIT_META_SYSTEM.HREF.replace(':project', projectId).replace(':system', systemId),
          TITLE: systemName || 'Not Found',
        },
      ]
    : []),
];
