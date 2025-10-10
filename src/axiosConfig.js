import axios from 'axios';
import store from './store/index';  // Remove './client/src/'

axios.interceptors.request.use((config) => {
  const token = store.getState().user.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config; 
});

export default axios;