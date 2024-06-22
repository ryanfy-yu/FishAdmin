// 引入
import axios from 'axios'
// 创建实例
const axioxExt = axios.create({
   baseURL: "http://localhost:8080", // base地址
   timeout: 5000 // 超时时间
})

// 配置拦截器
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default axioxExt // 将该实例对外暴露
