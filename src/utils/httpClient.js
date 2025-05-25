// const axios = require('axios');
// const accessTokenManager = require('./accessTokenManager');
// const logger = require('./logger');
// const config = require('../config');

// class HttpClient {
//     constructor() {
//         this.client = axios.create({
//             baseURL: config.API_BASE_URL,
//             timeout: 10000
//         });

//         // 请求拦截器：自动添加 access_token
//         this.client.interceptors.request.use(async (config) => {
//             try {
//                 // 如果请求需要 access_token
//                 if (config.needToken !== false) {
//                     const token = await accessTokenManager.getAccessToken();
//                     config.params = {
//                         ...config.params,
//                         access_token: token
//                     };
//                 }
//                 return config;
//             } catch (error) {
//                 logger.error('Error in request interceptor:', error);
//                 return Promise.reject(error);
//             }
//         });

//         // 响应拦截器：处理 access_token 相关错误
//         this.client.interceptors.response.use(
//             (response) => response,
//             async (error) => {
//                 if (!error.response) {
//                     return Promise.reject(error);
//                 }

//                 const originalRequest = error.config;
//                 const errcode = error.response.data?.errcode;

//                 // 如果是 access_token 相关错误且未重试过
//                 if ((errcode === 40001 || errcode === 42001) && !originalRequest._retry) {
//                     originalRequest._retry = true;

//                     try {
//                         // 强制刷新 token
//                         await accessTokenManager.forceRefresh();
//                         // 重试请求
//                         return this.client(originalRequest);
//                     } catch (refreshError) {
//                         logger.error('Error refreshing token in response interceptor:', refreshError);
//                         return Promise.reject(refreshError);
//                     }
//                 }

//                 return Promise.reject(error);
//             }
//         );
//     }

//     /**
//      * 发送 GET 请求
//      * @param {string} url 请求地址
//      * @param {Object} config 请求配置
//      * @returns {Promise} 请求结果
//      */
//     async get(url, config = {}) {
//         try {
//             const response = await this.client.get(url, config);
//             return response.data;
//         } catch (error) {
//             logger.error(`GET request failed for ${url}:`, error);
//             throw error;
//         }
//     }

//     /**
//      * 发送 POST 请求
//      * @param {string} url 请求地址
//      * @param {Object} data 请求数据
//      * @param {Object} config 请求配置
//      * @returns {Promise} 请求结果
//      */
//     async post(url, data = {}, config = {}) {
//         try {
//             const response = await this.client.post(url, data, config);
//             return response.data;
//         } catch (error) {
//             logger.error(`POST request failed for ${url}:`, error);
//             throw error;
//         }
//     }

//     /**
//      * 上传文件
//      * @param {string} url 上传地址
//      * @param {FormData} formData 表单数据
//      * @param {Object} config 请求配置
//      * @returns {Promise} 上传结果
//      */
//     async upload(url, formData, config = {}) {
//         try {
//             const response = await this.client.post(url, formData, {
//                 ...config,
//                 headers: {
//                     ...config.headers,
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });
//             return response.data;
//         } catch (error) {
//             logger.error(`Upload failed for ${url}:`, error);
//             throw error;
//         }
//     }
// }

// // 创建单例
// const httpClient = new HttpClient();

// module.exports = httpClient; 