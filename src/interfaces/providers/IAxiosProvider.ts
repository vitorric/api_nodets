import { TReturnFn } from '@domain/types';

export interface IAxiosProvider {
  get: (url: string) => Promise<TReturnFn<any>>;
  post: (url: string, data: any) => Promise<TReturnFn<any>>;
}
