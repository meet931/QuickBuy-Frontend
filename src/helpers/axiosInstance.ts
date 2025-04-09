import axios from 'axios';

const getToken = () => localStorage.getItem('token');

// Creating an Axios instance
const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  withCredentials: true,
});

// Adding a request interceptor to set the Authorization header if the token is available
axiosInstance.interceptors.request.use(
  (config) => {    
    const token = getToken();    

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {      
      delete config.headers['Authorization'];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Common function to handle requests
const request = async (method: any, url: any, data = {}, headers = {}) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      headers: {
        ...axiosInstance.defaults.headers.common,
        ...headers,
      },
    });

    return response.data;
  } catch (error: any) {    
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('Error Response:', error.response.data);
      console.log(error.response?.data?.message)
      throw new Error(error.response?.data?.message || 'Request failed');
    } else if (error.request) {
      // Request was made but no response was received
      console.error('Error Request:', error.request);
      throw new Error('No response received from server');
    } else {
      // Something happened in setting up the request
      console.error('Error Message:', error.message);
      throw new Error(error.message);
    }
  }
};

// GET request
const get = (url: any, headers = {}) => request('get', url, {}, headers);

// POST request
const post = (url: any, data: any, headers = {}) => request('post', url, data, headers);

// PUT request
const put = (url: any, data: any, headers = {}) => request('put', url, data, headers);

// PATCH request
const patch = (url: any, data: any, headers = {}) => request('patch', url, data, headers);

const del = (url: any, data = {}, headers = {}) => request('delete', url, data, headers);


export { get, post, put, patch, del };