import { keyMirror } from 'utils/helpers/utility';

const ActionTypes = keyMirror({
  // auth
  SET_CURRENT_USER: null,
  SET_ACCESS_TOKEN: null,
  SET_REFRESH_TOKEN: null,
  SET_PASSWORD_RESET_TOKEN: null,

  // loading
  SET_LOADING_STATUS: null,

  // users
  FETCH_USERS: null,

  // organizations
  FETCH_ORGANIZATIONS: null,
  SET_SELECTED_ORGANIZATION: null,
  SET_SELECTED_DEPARTMENTS: null,

  // events
  FETCH_EVENTS: null,
  FETCH_LATEST_EVENTS: null,

  // dashboard
  FETCH_DASHBOARDS: null,
  FETCH_REPORTS: null,

  // sows
  FETCH_SOWS: null,
  SET_SELECTED_SOW: null,
  SET_SOW_FILE_URL: null,

  // projects
  FETCH_PROJECTS: null,
  EDIT_PROJECT: null,
  FETCH_SYSTEM_TRENDS: null,
  CREATE_META_SYSTEM: null,
  FETCH_META_SYSTEMS: null,
  DELETE_META_SYSTEM: null,
  UPDATE_META_SYSTEM: null,
  UPDATE_DELIVERABLES: null,
  FETCH_META_SYSTEMS_FILTER: null,

  // popup
  SET_POPUP: null,

  // workflowTemplates
  FETCH_WORKFLOW_TEMPLATES: null,
  CREATE_WTD: null,
  UPDATE_WTD: null,
});

export default ActionTypes;
