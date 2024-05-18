import type { RestRequestConfig } from 'mock-config-server';

import type { User } from '../@types';

import { database } from './database.ts';

export const postSignUpEmailConfig: RestRequestConfig = {
  path: '/signup',
  method: 'post',
  routes: [
    {
      data: null,
      interceptors: {
        response: (_, { request, setStatusCode }) => {
          const { body } = request;
          const user = database.users.find((user) => user.email === body.email);

          if (user) {
            setStatusCode(401);
            return { success: true, message: 'Email is already in use' };
          }

          database.users.push({
            id: database.users.length,
            role: 'user',
            ...request.body
          } as User);

          setStatusCode(200);
          return { success: true, message: 'Email is already in use' };
        }
      }
    }
  ]
};
