import { sign } from 'jsonwebtoken';

type AuthToken = {
  accessToken?: string;
  refreshToken?: string;
};

const CLIENT_URL = process.env.APP_URL;

const auth = {
  refreshSecret: process.env.APP_JWT_REFRESH,
  accessSecret: process.env.APP_JWT_SECRET,
  accessExpiresIn: process.env.APP_JWT_SECRET_EXP_IN || '14d',
  refreshExpiresIn: process.env.APP_JWT_REFRESH_EXP_IN || '14d',
};

const generateToken = (userId: string): AuthToken => {
  const secretToken = auth.accessSecret as string;
  return {
    accessToken: sign({ userId, source: CLIENT_URL }, secretToken, {
      expiresIn: auth.accessExpiresIn,
    }),
    refreshToken: sign({ userId, source: CLIENT_URL }, secretToken, {
      expiresIn: auth.refreshExpiresIn,
    }),
  };
};

export default generateToken;
