import { GET_LIST_SUCCESS } from "./action";

const defaultState = {
  name: `China`,
  homeList: [],
};

export const home = (state = defaultState, action) => {
  const { type, data = {} } = action;
  switch (type) {
    case GET_LIST_SUCCESS:
      return {
        ...state,
        homeList: data
      };
    default:
      return state;
  }
};