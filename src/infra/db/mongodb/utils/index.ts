import { Types } from 'mongoose';

export type ObjectId = string | Types.ObjectId;

export const ObjectIdCast = (_id: ObjectId): Types.ObjectId => {
  return new Types.ObjectId(_id);
};

export type TQueryPagination<T> = {
  metadata: { total: number; page: number };
  data: Array<T>;
};
