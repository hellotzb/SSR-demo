import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import NotFound from './screens/NotFound';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';

// 原生处理二级路由
export const routes = [
  {
    key: 'header',
    path: '/',
    element: <Header />,
    loadData: Header.loadData,
    children: [
      {
        key: 'home',
        path: 'home',
        parentPath: '/', //使 matchPath 能够匹配多级路由，TODO: 优化
        element: <Home />,
        loadData: Home.loadData,
      },
      {
        key: 'login',
        path: 'login',
        parentPath: '/',
        element: <Login />,
      },
    ],
  },
  {
    key: 'test',
    path: '/test',
    element: (
      <div>
        <p>test</p>
        <Outlet />
      </div>
    ),
    children: [
      {
        key: 'test2',
        path: 'test2',
        parentPath: '/test',
        element: <Home />,
        loadData: Home.loadData,
      },
    ],
  },
  {
    key: 'not-found',
    path: '*',
    element: <NotFound />,
  },
];

const mapRoutes = routes => {
  if (
    Object.prototype.toString.call(routes) !== '[object Array]' ||
    routes.length === 0
  )
    return null;
  return routes.map(route => {
    return (
      <Route {...route} path={route.path}>
        {mapRoutes(route.children)}
      </Route>
    );
  });
};

export default () => {
  return <Routes>{mapRoutes(routes)}</Routes>;
};
