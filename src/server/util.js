import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { matchPath } from 'react-router';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import { Helmet } from 'react-helmet';
import Routes from '../routes';

export const render = (store, req) => {
  /* 
    1.服务器接收到请求，这个时候store是空的
    2.服务器不会执行componentDidMount，所以列表内容获取不到
    3.客户端代码运行，这个时候store也是空的
    4.客户端会执行componentDidMount，获取列表数据，更新store的内容
    5.客户端渲染出列表对应内容
   */
  const css = new Set(); // CSS for all rendered React components
  const insertCss = (...styles) =>
    styles.forEach(style => css.add(style._getCss()));

  // renderToString无法处理事件
  const homeContent = renderToString(
    <StyleContext.Provider value={{ insertCss }}>
      <Provider store={store}>
        <StaticRouter location={req.url}>
          <Routes />
        </StaticRouter>
      </Provider>
    </StyleContext.Provider>
  );

  // 使用react-helmet优化seo
  const helmet = Helmet.renderStatic();

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <script src="/index.js" defer></script>
        <style>${[...css].join('')}</style>
      </head>
      <body>
        <div id="root">${homeContent}</div>
        <script>
          // 数据的注水
          window.context = {
            state: ${JSON.stringify(store.getState())}
          };
        </script>
      </body>
    </html>
  `;
};

// 扩展 matchPath 方法，能够匹配多级路由
const newMatchpath = (route, url, parentPath) => {
  // '/' -> '/home'
  // '/test' -> '/test/test2'
  if (parentPath) {
    // 处理多级路由
    const newParentPath = parentPath === '/' ? '' : parentPath;
    return url === newParentPath + '/' + route.path;
  } else {
    return matchPath(route, url);
  }
};

export const matchRoutesFn = (routes, url, cb, parentPath) => {
  if (
    Object.prototype.toString.call(routes) !== '[object Array]' ||
    routes.length === 0
  )
    return false;

  for (let i = 0; i < routes.length; i++) {
    // matchPath 只能处理一级路由
    const match = newMatchpath(routes[i], url, parentPath);
    if (match) {
      // console.log('route matched', routes[i]);
      cb?.(routes[i]);
      return true;
    } else if (routes[i].children) {
      // 子路由匹配的话将父路由放入matchRoute数组中
      const childrenMatch = matchRoutesFn(
        routes[i].children,
        url,
        cb,
        routes[i].path
      );
      childrenMatch && cb?.(routes[i]);
    }
  }
};
