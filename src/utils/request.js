import axios from 'axios';
import { message } from 'ant-design-vue';

const request = axios.create({
  baseURL: 'https://tsapi.amap.com/v1/track',
});

request.interceptors.response.use(
  ({ data }) => {
    const { errmsg } = data;
    if (errmsg === 'OK') {
      return Promise.resolve(data.data);
    }
    message.error(errmsg);
    return Promise.reject(new Error(errmsg));
  },
  (error) => Promise.reject(error),
);

export default request;
