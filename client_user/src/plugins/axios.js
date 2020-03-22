import Vue from 'vue';
import axios from 'axios';

axios.interceptors.response.use(response => {
  const { status } = response;
  const { data } = response;
  if (status === 200) {
    if (data.code === 0) {
      return data.data;
    } else {
      return Vue.prototype.$toast.fail(data.message);
    }
  }
  Vue.prototype.$toast.fail(`服务器错误，请稍后重试 (Reason: http_code=${status})`);
}, error => {
  Vue.prototype.$toast.fail(`服务器错误，请稍后重试 ${error.message}`);
  return Promise.reject(error);
});
