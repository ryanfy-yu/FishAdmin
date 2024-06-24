import axios from 'axios'
import { useUserInfoStore } from '@/stores/userInfo';

const axioxExt = axios.create({
  // baseURL: "http://192.168.211.137:9080", // base地址
  timeout: 5000, // 超时时间
  headers: { "Content-Type": "application/json;charset=UTF-8" }

})

//request拦截
axios.interceptors.request.use(function (config) {

  const userinfo = useUserInfoStore()

  //添加token
  if (userinfo.accessToken) {
    config.headers.Authorization = "Bearer " + userinfo.accessToken

  }

  return config;
}, function (error) {

  return Promise.reject(error);
});

//response拦截
axios.interceptors.response.use(function (response) {

  return response;
}, function (error) {

  return Promise.reject(error);
});

export default axioxExt
