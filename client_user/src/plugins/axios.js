import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';

axios.interceptors.request.use(config => {
  if (config.isForm) {
    config.headers = {
      ...config.headers || {},
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    config.data = qs.stringify(config.data);
  }
  return config;
});

axios.interceptors.response.use(response => {
  const { status } = response;
  const { data } = response;
  if (status === 200) {
    if (data.code === 0) {
      return data.data;
    } else {
      throw new Error(data.message); 
    }
  }
  throw new Error(`服务器错误，请稍后重试 (Reason: http_code=${status})`);
}, error => {
  Vue.prototype.$toast.fail(`服务器错误，请稍后重试 ${error.message}`);
  return Promise.reject(error);
});
