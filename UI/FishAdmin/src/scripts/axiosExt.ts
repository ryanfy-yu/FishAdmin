import axios from 'axios'
import { useUserInfoStore } from '@/stores/userInfo';

const axioxExt = axios.create({
  // baseURL: "http://192.168.211.137:9080", // base地址
  timeout: 100000, // 超时时间
  headers: { "Content-Type": "application/json;charset=UTF-8" },

  //withCredentials: true,
})

//request拦截
axioxExt.interceptors.request.use(function (config) {

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
axioxExt.interceptors.response.use(function (response) {

  return response;
}, function (error) {

  if (error.message == "Network Error" || (error.response && error.response.status == "401")) {

    try {
      const userInfo = useUserInfoStore();
      const refreshToken = userInfo.refreshToken
      if (refreshToken) {
        axios({
          url: 'http://localhost:5142/api/RefreshToken',
          data: userInfo.accessToken,
          method: 'post',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: "Bearer " + refreshToken
          },
        }).then(function (response) {
          if (response.data.isSuccess) {
            userInfo.accessToken = response.data.data
            return axioxExt(error.config)
          }
        }).catch(function (error) {

          return Promise.reject(error);
        })
      }
    } catch (error) {

      console.log(error)
      return Promise.reject(error);
    }
    return Promise.reject(error);
  } else {

    return Promise.reject(error);

  }

});

export default axioxExt
