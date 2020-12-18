import axios from 'axios';
import { Storage } from 'react-jhipster';
import AsyncStorage from '@react-native-community/async-storage'
import { locales } from './translation';

const TIMEOUT = 3 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
// axios.defaults.baseURL = SERVER_API_URL;
// axios.defaults.headers.Cont='application/json';
const setupAxiosInterceptors = (onUnauthenticated: any) => {
  const onRequestSuccess = (config: any) => {
    const token = AsyncStorage.getItem('jhi-authenticationToken')
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
        // responseType: 'blob'
      };
    }
    return config;
  };
  const onResponseSuccess = (response: any) => response;
  const onResponseError = (err: any) => {
    const status = err.status || err.response.status;
    if (status === 403 || status === 401) {
      onUnauthenticated();
    }
    return Promise.reject(err);
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
