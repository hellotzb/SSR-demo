import React, { useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { fetchLogin, logout } from './store';
import { LOGIN_INFO } from '../../config';
import useStyles from 'isomorphic-style-loader/useStyles';

import styles from './index.less'; // 需要在webpack中css-loader的配置开启modules: true,

const Header = () => {
  useStyles(styles);
  const isLogin = useSelector(state => state.header.isLogin);
  const dispatch = useDispatch();

  // useEffect(() => {
  // 优化，login通用接口服务端能够后渲染可以不在客户端进行渲染(处理二级路由)
  // dispatch(fetchLogin(LOGIN_INFO));
  // }, []);

  const handleLogin = () => {
    dispatch(fetchLogin(LOGIN_INFO));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <Link to='/home'>首页</Link>
      <br />
      {isLogin ? (
        <div className={styles.logout} onClick={handleLogout}>
          退出
        </div>
      ) : (
        <div className={styles.login} onClick={handleLogin}>
          登陆
        </div>
      )}
      <Outlet />
    </div>
  );
};

Header.loadData = store => {
  return store.dispatch(fetchLogin(LOGIN_INFO));
};

export default Header;
