import { config } from '../config';

const appConf = config;
let defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};
const request = (method, route, data, config = {}) => {
  const BASE_URL = appConf.apiHost;
  let options = Object.assign({}, config, {
    method,
    body: data
  });
  options.headers = options.headers || defaultHeaders;
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + route, options)
      .then(response => response.json())
      .then(data => {
        if (!data) {
          return resolve(data);
        }
        if (data.HasError) {
          // layer.msg(res.message)
          reject(data);
        }
        resolve(data);
      })
      .catch(res => {
        // if (!res.config.notNotifyError) {
          // layer.msg(res.message)
        // }
        reject(res);
      });
  });
};

export const ajax = {
  get(route, config) {
    return request('GET', route, null, config);
  },
  delete(route, config) {
    return request('DELETE', route, null, config);
  },
  post(route, data, config) {
    return request('POST', route, data, config);
  },
  put(route, data, config) {
    return request('PUT', route, data, config);
  },
  setCommonHeader(key, value) {
    defaultHeaders[key] = value;
  }
};
