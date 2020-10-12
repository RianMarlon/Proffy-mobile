import api from './api';

import AsyncStorage from '@react-native-community/async-storage';

export const TOKEN_KEY = '@proffy:user';

export const hasToken = async () => {

  const tokenAsyncStorage = await AsyncStorage.getItem(TOKEN_KEY);
  
  const hasTokenInAsyncStorage = tokenAsyncStorage !== null;

  if (hasTokenInAsyncStorage) {
    return true;
  }

  else {
    return false;
  }
};

export const hasTokenValid = async () => {

  if (hasToken()) {
    const tokenAsyncStorage = await AsyncStorage.getItem(TOKEN_KEY);

    const data = {
      token: tokenAsyncStorage,
    }

    const response = await api.post('/validate-token', data);
    const { isTokenValid } = response.data;

    if (!isTokenValid) {
      AsyncStorage.removeItem(TOKEN_KEY);
    }

    return isTokenValid;
  }

  else {
    return false;
  }
};

export const getToken = async () => {
  const tokenAsyncStorage = await AsyncStorage.getItem(TOKEN_KEY);
  
  const hasTokenInAsyncStorage = tokenAsyncStorage !== null;

  if (hasTokenInAsyncStorage) {
    console.log(tokenAsyncStorage);
    return tokenAsyncStorage;
  }
};

export const removeToken = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY);
};
