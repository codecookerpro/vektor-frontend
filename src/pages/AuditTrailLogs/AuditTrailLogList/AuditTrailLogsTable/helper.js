import { ENTITY_NAME_TYPES } from 'utils/constants';
import LINKS from 'utils/constants/links';

export const getLinkFromEvent = ({ mName, mId, nestId, nestedName }) => {
  let link = null;

  switch (mName) {
    case ENTITY_NAME_TYPES.workflow:
      link = LINKS.EDIT_WORKFLOW_TEMPLATE.HREF.replace(':id', mId);
      break;
    case ENTITY_NAME_TYPES.metaSystem:
      link = LINKS.EDIT_META_SYSTEM.HREF.replace(':projectId', mId);
      break;
    default:
      break;
  }

  return link;
};
