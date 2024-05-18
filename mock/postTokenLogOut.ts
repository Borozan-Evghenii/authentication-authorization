import type { RestRequestConfig } from 'mock-config-server';

import { COOKIE } from './constants';
import { database } from './database.ts';

export const postTokenLogOut: RestRequestConfig = {
  path: '/jwt/logout',
  method: 'post',
  routes: [
    {
      data: null,
      interceptors: {
        response: (_, { getCookie, setStatusCode }) => {
          const refreshToken = getCookie(COOKIE.REFRESH_TOKEN);

          if (!refreshToken) {
            setStatusCode(401);
            return { success: false, message: 'Token is required' };
          }

          const tokenIndex = database.refreshTokens.findIndex(
            (token) => token.id.toString() === refreshToken
          );

          if (!tokenIndex) {
            setStatusCode(401);
            return { success: false, message: 'Token is not found we are not authorised' };
          }

          database.refreshTokens.splice(tokenIndex, 1);

          return { success: false, message: 'User not found' };
        }
      }
    }
  ]
};
