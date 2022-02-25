import { GET_LOGIN_SUCCESS, LOGOUT } from './action';

const defaultState = {
  isLogin: false,
};
export const header = (state = defaultState, action) => {
  const { type, data = {} } = action;
  switch (type) {
    case GET_LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: true,
      };
    case LOGOUT:
      return {
        ...state,
        ...data,
      };
    default:
      return state;
  }
};
