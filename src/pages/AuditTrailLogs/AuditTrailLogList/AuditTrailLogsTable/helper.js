import { LinkButton } from 'components/UI/Buttons';
import { ENTITY_NAME_TYPES } from 'utils/constants';
import LINKS from 'utils/constants/links';

const appendAnchorMark = (url, anchorId) => {
  if (anchorId) {
    return `${url}#${anchorId}`;
  }
  return url;
};

export const getLinkFromEvent = ({ mName, mId, nestedId, nestedName }) => {
  let link = null;
  const title = nestedName || mName;

  switch (mName) {
    case ENTITY_NAME_TYPES.metaSystem:
      link = appendAnchorMark(LINKS.EDIT_META_SYSTEM.HREF.replace(':systemId', mId), nestedId);
      break;
    case ENTITY_NAME_TYPES.organization:
      link = appendAnchorMark(LINKS.EDIT_ORGANIZATION.HREF.replace(':id', mId), nestedId);
      break;
    case ENTITY_NAME_TYPES.project:
      link = appendAnchorMark(LINKS.EDIT_PROJECT.HREF.replace(':id', mId), nestedId);
      break;
    case ENTITY_NAME_TYPES.sow:
      link = appendAnchorMark(LINKS.EDIT_SOW.HREF.replace(':id', mId), nestedId);
      break;
    case ENTITY_NAME_TYPES.system:
      link = appendAnchorMark(LINKS.EDIT_META_SYSTEM.HREF.replace(':systemId', '_').replace(':mainSystemId', mId), nestedId);
      break;
    case ENTITY_NAME_TYPES.user:
      link = appendAnchorMark(LINKS.EDIT_USER.HREF.replace(':id', mId), nestedId);
      break;
    case ENTITY_NAME_TYPES.workflow:
      link = appendAnchorMark(LINKS.EDIT_WORKFLOW_TEMPLATE.HREF.replace(':id', mId), nestedId);
      break;

    default:
      break;
  }

  return <LinkButton to={link}>{title}</LinkButton>;
};
