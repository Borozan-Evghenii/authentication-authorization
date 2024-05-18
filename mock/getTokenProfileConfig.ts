import type { UserTokenPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import type { RestRequestConfig } from 'mock-config-server';

import { ACCESS_TOKEN_SECRET_KEY, COOKIE } from './constants';
import { database } from './database.ts';

export const getTokenProfileConfig: RestRequestConfig = {
  path: '/jwt/profile',
  method: 'get',
  routes: [
    {
      data: null,
      interceptors: {
        response: (_, { getCookie, setStatusCode }) => {
          const token = getCookie(COOKIE.ACCESS_TOKEN);

          if (!token) {
            setStatusCode(401);
            return { success: false, message: 'Token is required' };
          }

          return jwt.verify(token, ACCESS_TOKEN_SECRET_KEY, (err, decode) => {
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

            return user;
          });
        }
      }
    }
  ]
};
