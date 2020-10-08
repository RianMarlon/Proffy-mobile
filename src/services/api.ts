import AsyncStorage from '@react-native-community/async-storage';
import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.6:3333',
});

api.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const token = await AsyncStorage.getItem('@proffy/user');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
