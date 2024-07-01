import axios from 'axios'
import { useUserInfoStore } from '@/stores/userInfo';
import { ElMessage } from 'element-plus'
import { appsettings } from '@/scripts/appSettings';

const axioxExt = axios.create({
  baseURL: appsettings.default_baseURL, // base地址
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
}, async function (error) {

  //alert(JSON.stringify(error))

  if (error.message == "Network Error" || (error.response && error.response.status == "401")) {
    try {
      const userInfo = useUserInfoStore();
      const refreshToken = userInfo.refreshToken
      if (refreshToken) {
        const res = await axios({
          url: `${appsettings.sso_URL}/RefreshToken`,
          data: userInfo.accessToken,
          method: 'post',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: "Bearer " + refreshToken
          },
        })

        if (res.data.isSuccess) {
          userInfo.accessToken = res.data.data
          return axioxExt(error.config)
        }
      }
    } catch (error) {

      return Promise.reject(error);
    }
  }


});

export default axioxExt
