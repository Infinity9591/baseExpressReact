import axios from 'axios';
import {Cookies} from 'react-cookie';

const cookie = new Cookies();

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers : {
        Authorization : `Bearer ${cookie.get('access-token')}`,
    }
});

// Alter defaults after instance has been created
// instance.defaults.headers.common['Authorization'] = cookie.get('access-token');

// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    },
);

export default instance;
