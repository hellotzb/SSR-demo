import { LOGIN_API } from '../../../config';

export const GET_LOGIN_SUCCESS = 'GET_LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const changeLoginStatus = data => {
  return {
    type: GET_LOGIN_SUCCESS,
    data,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
    data: {
      isLogin: false,
    },
  };
};

// node中间层proxy转发api，客户端不直接请求api服务器
export const fetchLogin = params => {
  return (dispatch, getState, request) => {
    // 浏览器端运行/api/users = http://localhost:3001/api/users
    // 服务端运行/api/users = 服务器根目录/api/users --> 报错（TypeError: Only absolute URLs are supported）
    return request(LOGIN_API, {
      headers: { 'Content-type': 'application/json' },
      method: 'post',
      body: JSON.stringify(params),
    }).then(data => {
      if (+data.status === 200) {
        dispatch(changeLoginStatus(data));
      }
    });
  };
};
