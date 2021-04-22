import * as TYPES from 'redux/types'
import * as userAPI from 'services/api-user'
import { isEmpty } from 'utils/helpers/utility'

const getUsers = (refresh = false) => async (dispatch, getState) => {
  try {
    const { users: { results } } = getState();
    if (!refresh && !isEmpty(results)) {
      return
    }

    const params = {
      skip: 0,
      limit: 10000
    }
    const { data = [] } = await userAPI.getUsers(params)
    await dispatch({
      type: TYPES.FETCH_USERS,
      payload: data
    });
  } catch (error) {
    console.log('[getUsers] error => ', error);
  }
};

const addUser = (user) => async (dispatch, getState) => {
  try {
    const { users: { results } } = getState();

    const newUsers = [
      user,
      ...results
    ]

    dispatch({
      type: TYPES.FETCH_USERS,
      payload: newUsers
    });
  } catch (error) {
    console.log('[addUser] error => ', error);
  }
};

const editUser = (user) => async (dispatch, getState) => {
  try {
    const { users: { results } } = getState();

    const newUsers = results.map((item) => {
      if (item._id === user._id) {
        return user
      }
      return item
    })

    dispatch({
      type: TYPES.FETCH_USERS,
      payload: newUsers
    });
  } catch (error) {
    console.log('[editUser] error => ', error);
  }
};

const removeUser = (user) => async (dispatch, getState) => {
  try {
    const { users: { results } } = getState();

    const newUsers = results.filter((item) => item._id !== user._id)

    dispatch({
      type: TYPES.FETCH_USERS,
      payload: newUsers
    });
  } catch (error) {
    console.log('[removeUser] error => ', error);
  }
};

export {
  getUsers,
  addUser,
  editUser,
  removeUser
};
