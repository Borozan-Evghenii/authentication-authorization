type UserRole = 'user' | 'admin';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  country: string;
}

export interface Session {
  id: number;
  userId: number;
}

export interface JWTRefreshToken {
  id: number;
  userId: number;
}

export interface UserTokenPayload {
  userId: string;
  email: string;
}
