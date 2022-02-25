import fetch from 'node-fetch';
import { SERVER_BASEURL } from '../config';

export const serverFetch = (url, config) => {
  // console.log('服务端fetch');
  if (url.includes('http')) {
    const newURL = url.replace('/api', '');
    return fetch(newURL, config)
      .then(response => response.json())
      .catch(err => {
        console.error('fetch err', err);
        return Promise.reject(err);
      });
  } else {
    return fetch(`${SERVER_BASEURL}${url}`, config)
      .then(response => response.json())
      .catch(err => {
        console.error('fetch err', err);
        return Promise.reject(err);
      });
  }
};
