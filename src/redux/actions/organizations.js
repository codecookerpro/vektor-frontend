import * as TYPES from 'redux/types';
import * as organizationAPI from 'services/api-organization';
import { isEmpty } from 'utils/helpers/utility';

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

export { getOrganizations, addOrganization, editOrganization, removeOrganization };
