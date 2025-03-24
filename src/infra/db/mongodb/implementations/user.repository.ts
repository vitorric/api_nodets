import { IUserRepository } from 'src/interfaces/repository/user-repository.interface';
import User from '@domain/entities/user';
import { TObject } from '@domain/types';
import { userSchema } from '../schema/user.schema';
import { ObjectIdCast } from '../utils';

class UserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    return userSchema.create(user);
  }

  async auth(email: string, password: string): Promise<TObject<User>> {
    return userSchema
      .findOne({
        email,
        password,
        deleted: false,
        status: true,
      })
      .lean()
      .exec();
  }

  async getById(_id: string): Promise<TObject<User>> {
    return userSchema
      .findOne({
        _id: ObjectIdCast(_id),
        deleted: false,
        status: true,
      })
      .lean()
      .exec();
  }
}

export const userRepository = new UserRepository();
