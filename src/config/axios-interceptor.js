import axios from 'axios';
// import Toast from '../alert/alert.js';
window.axios = axios;
axios.defaults.baseURL = 'https://stg.api.eventsinminutes.com/';
axios.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('token');
        // config.headers['Authorization'] = `Bearer ${token}`;
        // if (token) {
        //     config.headers['table'] = JSON.parse(localStorage.getItem('admin')).user_type_name;
        //     config.headers['uid'] = JSON.parse(localStorage.getItem('admin')).UID;
        // }
        // config.headers['source'] = 'Organization';
        // config.headers['apiKey'] = 'secretkey';
        config.headers['Access-Control-Allow-Origin'] = '*';
        if (token) {
            config.headers.token = `${token}`;
        }
        return config;
    },
    function (err) {
        return Promise.reject(err);
    }
);

// Token expire redirection
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        if (error.response.status === 403 && localStorage.getItem('token')) {
            alert('Session Expired');
            window.location.href = '/';
            localStorage.clear();
            return axios();
        }
        if (error.response.status === 401 && localStorage.getItem('token')) {
            alert('Someone has loggedIn with this account please login again');
            window.location.href = '/';
            localStorage.clear();
            return axios();
        }
        return Promise.reject(error);
    }
);
