export type TReturnFn<T> = {
  error: boolean | string | string[];
  return: T;
};

export type TObject<T> = T | null;

export type TJWTUser = {
  _id: string;
  name: string;
};
