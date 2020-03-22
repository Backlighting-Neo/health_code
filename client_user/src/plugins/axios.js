import Vue from 'vue';
import axios from 'axios';

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
}, error => {
  throw new Error(`服务器错误，请稍后重试 ${error.message}`);
});
