// server入口文件
import proxy from 'express-http-proxy';
import { render, matchRoutesFn } from './util';
import { port, SERVER_BASEURL } from '../config';
import { getStore } from '../store';
import { routes } from '../routes';

const express = require('express');
const app = express();

// 静态资源
app.use(express.static('public'));

app.use(
  '/api',
  proxy(SERVER_BASEURL, {
    proxyReqPathResolver: function (req) {
      return '/api' + req.url;
    },
  })
);

app.get('*', function (req, res) {
  // TODO：解决未知bug，自动调起/json和/json/version的路由
  if (req.url.includes('json')) return;

  const store = getStore();
  // 需要根据路由的路径来往store中加数据

  // 如果用户访问/home，就拿home组件的异步数据；如果访问/page路径，就拿page组件的异步数据
  const promises = [];
  const matchRoutes = []; // 储存匹配的路由路径

  // matchPath无法处理二级路由,使用 matchRoutesFn 封装处理
  matchRoutesFn(routes, req.url, route => {
    // 有匹配的路径将路由信息储存到matchRoutes中
    matchRoutes.push(route);
  });

  // console.log('matchRoutes--', matchRoutes);
  matchRoutes.forEach(item => {
    if (item.loadData) {
      // 避免有一个接口获取失败导致服务端渲染错误以及有一个接口报错，其他接口请求时间过长不会返回
      const promise = new Promise(resolve => {
        item.loadData(store).finally(resolve);
      });
      promises.push(promise);
    }
  });

  Promise.all(promises).then(() => {
    // 这时已经准备好数据
    // console.log('state--', store.getState());
    res.send(render(store, req));
  });
});

app.listen(port, () => {
  console.log(`SSR app listening at http://localhost:${port}`);
});
