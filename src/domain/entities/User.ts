export default class User {
  public readonly _id: string;

  public name: string;
  public email: string;
  public password: string;
  public status: boolean;
  public deleted: boolean;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(props: Omit<User, '_id'>) {
    Object.assign(this, props);
  }
}
