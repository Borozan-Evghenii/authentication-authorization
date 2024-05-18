import type { UserTokenPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import type { RestRequestConfig } from 'mock-config-server';

import { ACCESS_TOKEN_SECRET_KEY, COOKIE, REFRESH_TOKEN_SECRET_KEY } from './constants';
import { database } from './database.ts';

export const getTokenRefreshConfig: RestRequestConfig = {
  path: '/jwt/refresh',
  method: 'get',
  routes: [
    {
      data: null,
      interceptors: {
        response: (_, { getCookie, setStatusCode, setCookie }) => {
          const refreshToken = getCookie(COOKIE.REFRESH_TOKEN);

          if (!refreshToken) {
            setStatusCode(401);
            return { success: false, message: 'Refresh Token is required' };
          }

          const tokenIsRegistered = database.refreshTokens.find(
            (item) => item.id.toString() === refreshToken
          );

          if (!tokenIsRegistered) {
            setStatusCode(401);
            return { success: false, message: 'Refresh Token is not found' };
          }

          jwt.verify(refreshToken, REFRESH_TOKEN_SECRET_KEY, (err, decode) => {
            if (err) {
              setStatusCode(401);
              return { success: false, message: 'Token is invalid' };
            }

            decode = decode as UserTokenPayload;

            const user = database.users.find((user) => user.id === decode.userId);

            if (!user) {
              setStatusCode(401);
              return { success: false, message: 'User is not found' };
            }

            const payload: UserTokenPayload = {
              userId: user.id,
              email: user.email
            };

            const newToken = jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, { expiresIn: '13m' });

            setCookie(COOKIE.ACCESS_TOKEN, newToken, {
              httpOnly: true,
              maxAge: 13 * 60 * 1000,
              path: '/',
              secure: true
            });

            return { success: true, message: 'Successfully logged in' };
          });

          return { success: true, message: ' Token is refreshed' };
        }
      }
    }
  ]
};
