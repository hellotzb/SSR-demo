import fetch from 'node-fetch';
import { CLIENT_BASEURL } from '../config';

export const clientFetch = (url, config) => {
  // console.log('客户端fetch');
  if (url.includes('http')) {
    const newURL = url.replace('/api', '');
    return fetch(newURL, config)
      .then(response => response.json())
      .catch(err => {
        console.error('fetch err', err);
        return Promise.reject(err);
      });
  } else {
    return fetch(`${CLIENT_BASEURL}${url}`, config)
      .then(response => response.json())
      .catch(err => {
        console.error('fetch err', err);
        return Promise.reject(err);
      });
  }
};
