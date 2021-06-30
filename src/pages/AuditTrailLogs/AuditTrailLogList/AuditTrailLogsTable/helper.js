import { ENTITY_NAME_TYPES } from 'utils/constants';
import LINKS from 'utils/constants/links';

export const getLinkFromEvent = ({ mName, mId, nestId, nestedName }) => {
  switch (mName) {
    case ENTITY_NAME_TYPES.workflow:
      return LINKS.EDIT_WORKFLOW_TEMPLATE.HREF.replace(':id', mId);
  }
};
