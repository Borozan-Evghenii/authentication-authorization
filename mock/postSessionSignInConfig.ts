import type { RestRequestConfig } from 'mock-config-server';

import { COOKIE } from './constants';
import { database } from './database.ts';

const generateToken = () => {
  let sessionId = '';

  for (let i = 0; i < 10; i + 1) {
    sessionId += Math.floor(Math.random() * 10);
  }

  return sessionId;
};

export const postSessionSignInConfig: RestRequestConfig = {
  path: '/session/login',
  method: 'post',
  routes: [
    {
      data: null,
      interceptors: {
        response: (_, { request, setCookie, setStatusCode }) => {
          const { body } = request;
          const user = database.users.find(
            (user) => user.email === body.email && user.password === body.password
          );

          if (!user) {
            setStatusCode(400);
            return { success: false, message: 'User not found' };
          }

          const sessionId = generateToken();
          database.sessions.push({
            id: +sessionId,
            userId: user.id
          });

          setCookie(COOKIE.SESSION_ID, sessionId, {
            httpOnly: true,
            maxAge: 360000,
            path: '/'
          });

          return user;
        }
      }
    }
  ]
};
