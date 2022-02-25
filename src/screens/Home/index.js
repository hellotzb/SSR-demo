import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeList } from './store';

// componentDidMount在服务器端是不执行的
const Home = () => {
  const name = useSelector(state => state.home.name);
  const homeList = useSelector(state => state.home.homeList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (homeList.length === 0) {
      dispatch(getHomeList());
    }
  }, []);

  return (
    <div>
      <button onClick={() => alert('Hello World')}>click</button>
      <div>home's name is: {name}</div>
      <div>HomeList:</div>
      {!!homeList.length &&
        homeList.map(item => (
          <div key={item.id}>
            <div>user's name: {item.name}</div>
            <div>user's email: {item.email}</div>
          </div>
        ))}
    </div>
  );
};

Home.loadData = store => {
  // loadData负责在服务器端渲染之前，把路由需要的数据提前加载好
  return store?.dispatch(getHomeList());
};

export default Home;
