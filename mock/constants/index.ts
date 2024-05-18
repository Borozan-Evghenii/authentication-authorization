const BASE = 'auth';

export const COOKIE = {
  SESSION_ID: `${BASE}-session`,
  ACCESS_TOKEN: `${BASE}-token`,
  REFRESH_TOKEN: `${BASE}-refreshToken`
};

export const ACCESS_TOKEN_SECRET_KEY = 'ACCESS_SECRET_KEY';
export const REFRESH_TOKEN_SECRET_KEY = 'REFRESH_SECRET_KEY';
