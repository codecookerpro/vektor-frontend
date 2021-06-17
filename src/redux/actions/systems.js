import * as TYPES from 'redux/types';
import * as systemAPI from 'services/api-system';

const getSystemHistory =
  (projectId, refresh = false) =>
  async (dispatch, getState) => {
    try {
      const {
        projects: { systemTrends },
      } = getState();

      if (systemTrends[projectId] && !refresh) {
        return;
      }

      const params = {
        filter: { project: projectId },
      };

      const response = await systemAPI.getSystemHistory(params);

      if (response) {
        const { data } = response;

        dispatch({
          type: TYPES.FETCH_SYSTEM_TRENDS,
          payload: { data, projectId },
        });
      }
    } catch (error) {
      console.log('[getProjects] error => ', error);
    }
  };

export { getSystemHistory };
