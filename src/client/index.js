// client入口文件
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { getClientStore } from '../store';
import Routes from '../routes';
import StyleContext from 'isomorphic-style-loader/StyleContext';

const store = getClientStore();

const insertCss = (...styles) => {
  const removeCss = styles.map(style => style._insertCss());
  return () => removeCss.forEach(dispose => dispose());
};

const App = () => {
  return (
    <StyleContext.Provider value={{ insertCss }}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    </StyleContext.Provider>
  );
};

// 如果代码既在服务器运行一次，又在客户端运行一次（同构），需要使用hydrate函数
ReactDOM.hydrate(<App />, document.getElementById('root'));
