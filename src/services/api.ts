import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const BASE_URL = 'https://14.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;
const TOKEN_KEY = 'six-cities-token';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token && config.headers) {
        config.headers['X-Token'] = token;
      }
      return config;
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error: { response?: { status?: number } }) => {
      if (error.response?.status === 401) {
        localStorage.removeItem(TOKEN_KEY);
      }
      return Promise.reject(error);
    }
  );

  return api;
};

