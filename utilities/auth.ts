import Cookies from 'js-cookie';
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

export { setAuthorization, authenticated, removeTokens };
