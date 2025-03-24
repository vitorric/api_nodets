import axios, { AxiosRequestConfig } from 'axios';

import { TReturnFn } from '@domain/types';
import { IAxiosProvider } from 'src/interfaces/providers/axios-provider.interface';

class AxiosProvider implements IAxiosProvider {
  errorHandle = (response: any): TReturnFn<any> => {
    const error = response?.data ?? response;

    return {
      error: true,
      return: error?.return
        ? error
        : {
            payload: {
              error: error ?? 'Falha ao se comunicar com a API.',
            },
          },
    };
  };

  async get(url: string): Promise<TReturnFn<any>> {
    try {
      const config: AxiosRequestConfig = {
        method: 'GET',
        url,
      };

      return {
        error: false,
        return: await axios(config),
      };
    } catch (err: any) {
      return this.errorHandle(err?.response);
    }
  }

  async post(url: string, data: any): Promise<TReturnFn<any>> {
    try {
      const config: AxiosRequestConfig = {
        method: 'POST',
        url,
        data,
      };

      return {
        error: false,
        return: await axios(config),
      };
    } catch (err: any) {
      return this.errorHandle(err?.response);
    }
  }
}

export const axiosProvider = new AxiosProvider();
