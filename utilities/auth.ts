import Cookies from 'js-cookie';
import axios, { AxiosInstance } from 'axios';
import type { GeneratedToken } from 'interfaces';

const CLIENT_URL = process.env.APP_URL;

type Token = {
  accessToken: string;
  refreshToken: string;
};

const EXPIRATION_IN_MINUTES = 20160;

const setAuthorization = (token: Token) => {
  const expires = new Date(new Date().getTime() + EXPIRATION_IN_MINUTES * 60 * 1000);
  const options = { expires };
  Cookies.set('token', token.refreshToken, options);
  Cookies.set('authToken', token.accessToken, options);
};

const authenticated = (token: GeneratedToken) => {
  return !(Date.now() >= token.exp * 1000 || CLIENT_URL !== token.source);
};

const removeTokens = () => {
  Cookies.remove('authToken');
  Cookies.remove('token');
};

const api: (token?: string) => AxiosInstance = (token) => {
  const tokenParams = token || Cookies.get('authToken');
  const headers = tokenParams ? {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenParams}`
    }
  } : {};

  return axios.create({
    baseURL: CLIENT_URL,
    ...headers
  });
}

export { setAuthorization, authenticated, removeTokens, api };
