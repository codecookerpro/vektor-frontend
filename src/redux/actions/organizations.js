import TYPES from 'utils/constants/action-types';
import * as organizationAPI from 'services/api-organization';
import { isEmpty } from 'utils/helpers/utility';
import { setPopup } from './popupActions';
import { POPUP_TYPE } from 'utils/constants';
import { errorCode2Message } from 'utils/helpers/errorCode2Message';
import { LOCAL_ORGANIZATION_ERRORS } from 'utils/constants/error-codes';

const getOrganizations =
  (refresh = false) =>
  async (dispatch, getState) => {
    try {
      const {
        organizations: { results },
      } = getState();
      if (!refresh && !isEmpty(results)) {
        return;
      }

      const params = {
        skip: 0,
        limit: 10000,
      };
      const { data = [] } = await organizationAPI.getOrganizations(params);
      await dispatch({
        type: TYPES.FETCH_ORGANIZATIONS,
        payload: data,
      });
    } catch (error) {
      console.log('[getOrganizations] error => ', error);
    }
  };

const addOrganization = (organization) => async (dispatch, getState) => {
  try {
    const {
      organizations: { results },
    } = getState();

    const newOrganizations = [organization, ...results];

    dispatch({
      type: TYPES.FETCH_ORGANIZATIONS,
      payload: newOrganizations,
    });
  } catch (error) {
    console.log('[addOrganization] error => ', error);
  }
};

const editOrganization = (organization) => async (dispatch, getState) => {
  try {
    const {
      organizations: { results },
    } = getState();

    const newOrganizations = results.map((item) => {
      if (item._id === organization._id) {
        return organization;
      }
      return item;
    });

    dispatch({
      type: TYPES.FETCH_ORGANIZATIONS,
      payload: newOrganizations,
    });
  } catch (error) {
    console.log('[editOrganization] error => ', error);
  }
};

const removeOrganization = (organization) => async (dispatch, getState) => {
  try {
    await organizationAPI.deleteOrganization({ _id: organization._id });

    const {
      organizations: { results },
    } = getState();

    const newOrganizations = results.filter((item) => item._id !== organization._id);

    dispatch({
      type: TYPES.FETCH_ORGANIZATIONS,
      payload: newOrganizations,
    });
  } catch (error) {
    console.log('[removeOrganization] error => ', error);
  }
};

const createOrganization = (options) => async (dispatch) => {
  await organizationAPI
    .createOrganization(options)
    .then((response) => {
      dispatch(setSelectedOrganization(response.data));
      dispatch(addOrganization(response.data));
    })
    .catch((err) => {
      dispatch(setPopup({ popupType: POPUP_TYPE.error, popupText: errorCode2Message(err?.response?.data?.code, LOCAL_ORGANIZATION_ERRORS) }));
    });
};

const updateOrganization = (options) => async (dispatch) => {
  await organizationAPI
    .updateOrganization(options)
    .then((response) => {
      dispatch(setSelectedOrganization(response.data));
      dispatch(editOrganization(response.data));
    })
    .catch((err) => {
      dispatch(setPopup({ popupType: POPUP_TYPE.error, popupText: errorCode2Message(100, []) }));
    });
};

const setSelectedOrganization = (organization) => {
  return {
    type: TYPES.SET_SELECTED_ORGANIZATION,
    payload: organization,
  };
};

const setSelectedDepartments = (departments) => {
  return {
    type: TYPES.SET_SELECTED_DEPARTMENTS,
    payload: departments,
  };
};

const addDepartment = (options) => async (dispatch) => {
  await organizationAPI
    .createOrganizationDepartment(options)
    .then((response) => {
      dispatch(setPopup({ popupType: POPUP_TYPE.info, popupText: 'Department was created' }));
      dispatch(editOrganization(response.data));
      dispatch(setSelectedOrganization(response.data));
      dispatch(setSelectedDepartments(response.data.departments));
    })
    .catch((err) => {
      dispatch(setPopup({ popupType: POPUP_TYPE.error, popupText: errorCode2Message(100, []) }));
    });
};

const editDepartment = (options) => async (dispatch) => {
  await organizationAPI
    .updateOrganizationDepartment(options)
    .then((response) => {
      dispatch(setPopup({ popupType: POPUP_TYPE.info, popupText: 'Department was saved' }));
      dispatch(editOrganization(response.data));
      dispatch(setSelectedOrganization(response.data));
      dispatch(setSelectedDepartments(response.data.departments));
    })
    .catch((err) => {
      dispatch(setPopup({ popupType: POPUP_TYPE.error, popupText: errorCode2Message(100, []) }));
    });
};

const deleteDepartment = (options) => async (dispatch) => {
  await organizationAPI
    .deleteOrganizationDepartment(options)
    .then((response) => {
      dispatch(editOrganization(response.data));
      dispatch(setSelectedOrganization(response.data));
      dispatch(setSelectedDepartments(response.data.departments));
    })
    .catch((err) => {
      dispatch(setPopup({ popupType: POPUP_TYPE.error, popupText: errorCode2Message(100, []) }));
    });
};

export {
  getOrganizations,
  addOrganization,
  editOrganization,
  removeOrganization,
  setSelectedOrganization,
  editDepartment,
  addDepartment,
  deleteDepartment,
  setSelectedDepartments,
  updateOrganization,
  createOrganization,
};
