import { TJWTUser } from '@domain/types';

export interface IJWTProvider {
  create(user: TJWTUser, minutes: number): string | null;
}
