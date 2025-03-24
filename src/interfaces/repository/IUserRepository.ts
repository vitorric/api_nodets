import User from '@domain/entities/User';
import { TObject } from '@domain/types';

export interface IUserRepository {
  create(user: User): Promise<User>;
  auth(email: string, password: string): Promise<TObject<User>>;
  getById(_id: string): Promise<TObject<User>>;
}
