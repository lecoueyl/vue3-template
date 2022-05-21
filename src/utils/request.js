import axios from 'axios';

const request = axios.create({
  baseURL: 'https://tsapi.amap.com/v1/track',
});

request.interceptors.response.use(
  (response) => Promise.resolve(response.data),
  (error) => Promise.reject(error),
);

export default request;
