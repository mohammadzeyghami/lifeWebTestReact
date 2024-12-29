// src/apis/axios.js
import axios, { AxiosRequestConfig } from "axios";

// Remove AuthContext import as it is no longer needed.
const useAxios = (config: AxiosRequestConfig = {}) => {
  // Create an Axios instance with overridden config if provided
  const axiosInstance = axios.create({
    baseURL: "https://fakestoreapi.com",
    timeout: 0,
    ...config, // Spread the additional config options
  });

  // Request interceptor (if needed in the future, but can be removed for now)
  axiosInstance.interceptors.request.use(
    (reqConfig) => {
      // You can add any custom headers here if needed
      return reqConfig;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor (if you want to handle errors uniformly)
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // You can handle error logging or actions here if desired.
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;
