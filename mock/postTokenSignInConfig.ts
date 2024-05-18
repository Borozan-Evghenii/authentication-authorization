import type { UserTokenPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import type { RestRequestConfig } from 'mock-config-server';

import { ACCESS_TOKEN_SECRET_KEY, COOKIE, REFRESH_TOKEN_SECRET_KEY } from './constants';
import { database } from './database.ts';

export const postTokenSignInConfig: RestRequestConfig = {
  path: '/jwt/login',
  method: 'post',
  routes: [
    {
      data: null,
      interceptors: {
        response: (_, { request, setCookie, setStatusCode }) => {
          const { body } = request;
          const user = database.users.find((user) => user.email === body.email);

          if (!user) {
            setStatusCode(401);
            return { success: true, message: 'User not found' };
          }

          const payload: UserTokenPayload = { userId: user.id, email: user.email };

          const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, {
            expiresIn: '15m'
          });
          const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, {
            expiresIn: '7d'
          });

          const tokenExist = database.refreshTokens.findIndex((token) => token.userId === user.id);

          if (!tokenExist) {
            setStatusCode(200);

            setCookie(COOKIE.ACCESS_TOKEN, `${database.refreshTokens[tokenExist]}`, {
              httpOnly: true,
              maxAge: 15 * 60 * 1000,
              path: '/'
            });

            return {
              success: true,
              message: 'Token already exists',
              token: database.refreshTokens[tokenExist]
            };
          }

          database.refreshTokens.push({ id: +refreshToken, userId: user.id });

          setCookie(COOKIE.ACCESS_TOKEN, accessToken, {
            httpOnly: true,
            maxAge: 900000,
            path: '/',
            secure: true
          });

          setCookie(COOKIE.REFRESH_TOKEN, refreshToken, {
            httpOnly: true,
            maxAge: 604800000000,
            path: '/',
            secure: true
          });

          return { success: true, message: 'Successfully logged in' };
        }
      }
    }
  ]
};
