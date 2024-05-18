import type { RestRequestConfig } from 'mock-config-server';

import type { JWTRefreshToken, Session, User } from '../@types';

export const database: { users: User[]; sessions: Session[]; refreshTokens: JWTRefreshToken[] } = {
  users: [
    {
      id: 0,
      role: 'admin',
      name: 'Borozan Evghenii',
      username: 'Jeka',
      email: 'test@test.com',
      password: '123456',
      country: 'MD'
    },
    {
      id: 1,
      name: 'Clementine Bauch',
      username: 'Samantha',
      email: 'test2@test.com',
      role: 'user',
      password: '123456',
      country: 'US'
    }
  ],
  sessions: [],
  refreshTokens: []
};

export const getDatabaseConfig: RestRequestConfig = {
  path: '/database',
  method: 'get',
  routes: [
    {
      data: () => database
    }
  ]
};
