import type jwt from 'jsonwebtoken';

declare module 'jsonwebtoken' {
  export interface UserTokenPayload extends jwt.JwtPayload {
    userId: number;
    email: string;
  }
}
