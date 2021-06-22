import TYPES from 'utils/constants/action-types';
import * as metaSystemAPI from 'services/api-meta-system';

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

      const response = await metaSystemAPI.getSystemHistory(params);

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
