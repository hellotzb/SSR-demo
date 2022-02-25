import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { home as homeReducer } from '../screens/Home/store';
import { header as headerReducer } from '../components/Header/store';
import { clientFetch } from '../client/fetch';
import { serverFetch } from '../server/fetch';

const reducer = combineReducers({ home: homeReducer, header: headerReducer });

// 直接导出的store是单例的，会被所有用户共享
// export default store;

// 问题：服务端和客户端没有共享store
export const getStore = () => {
  // 改变服务端store的内容，要使用serverFetch
  return createStore(
    reducer,
    applyMiddleware(thunk.withExtraArgument(serverFetch))
  );
};

// 解决：数据脱水和注水
export const getClientStore = () => {
  // 改变服务端store的内容，要使用clientFetch
  const defaultState = window.context.state;
  // 数据的脱水
  return createStore(
    reducer,
    defaultState,
    applyMiddleware(thunk.withExtraArgument(clientFetch))
  );
};
