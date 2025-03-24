/* eslint-disable @typescript-eslint/naming-convention */
import { TJWTUser } from '@domain/types';
import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user: TJWTUser;
  }
}

export { Request };
