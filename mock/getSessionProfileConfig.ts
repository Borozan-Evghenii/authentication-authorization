/** @type {import('mock-config-server').MockServerConfig} */
import type { RestRequestConfig } from 'mock-config-server';

import { COOKIE } from './constants';
import { database } from './database.ts';

export const getSessionProfileConfig: RestRequestConfig = {
  method: 'get',
  path: '/session/profile',
  routes: [
    {
      data: null,
      interceptors: {
        response: (_, { getCookie, setStatusCode }) => {
          const sessionId = getCookie(COOKIE.SESSION_ID);

          if (!sessionId) {
            setStatusCode(401);
            return { success: false, message: 'Session not found' };
          }

          const session = database.sessions.find((session) => session.id === +sessionId);

          if (!session) {
            setStatusCode(401);
            return { success: false, message: 'Session not found' };
          }

          const user = database.users.find((user) => session.userId === user.id);

          if (!user) {
            setStatusCode(401);
            return { success: false, message: 'User not found' };
          }

          return user;
        }
      }
    }
  ]
};
