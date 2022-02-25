import { GET_HOME_LIST_URL } from '../../../config';

export const GET_LIST_SUCCESS = 'GET_LIST_SUCCESS';

export const changeList = data => {
  return {
    type: GET_LIST_SUCCESS,
    data,
  };
};

// node中间层proxy转发api，客户端不直接请求api服务器
export const getHomeList = () => {
  return (dispatch, getState, request) => {
    // 浏览器端运行/api/users = http://localhost:3001/api/users
    // 服务端运行/api/users = 服务器根目录/api/users --> 报错（TypeError: Only absolute URLs are supported）
    return request(
      `http://jsonplaceholder.typicode.com${GET_HOME_LIST_URL}`
    ).then(data => {
      dispatch(changeList(data));
    });
  };
};
