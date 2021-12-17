import { TYPES } from '../../../../const';
import { singletonProvide } from '../../../ioc';

import request from 'request';

export interface IHttpHelper {
  formData(url: string, body: any, option?: any): Promise<any>;
  post(url: string, body: any, option?: any): Promise<any>;
  get(url: string): Promise<any>;
}

@singletonProvide(TYPES.HTTP_HELPER)
export class HttpHelper implements IHttpHelper {
  async formData(
    url: string,
    body: any,
    option?: request.CoreOptions,
  ): Promise<any> {
    if (!url || typeof url !== 'string') throw new Error('url is invalid');
    return new Promise((resolve, reject) => {
      request.post(
        {
          url,
          form: body,
        },
        (err, httpResponse, body) => {
          if (err) return reject(err);
          resolve(body);
        },
      );
    });
  }

  async post(
    url: string,
    body: any,
    option?: request.CoreOptions,
  ): Promise<any> {
    if (!url || typeof url !== 'string') throw new Error('url is invalid');
    return new Promise((resolve, reject) => {
      request.post(
        {
          url,
          body,
          json: true,
          headers: option ? option.headers : undefined,
        },
        (err, httpResponse, body) => {
          if (err) return reject(err);
          resolve(body);
        },
      );
    });
  }

  async get(url: string): Promise<any> {
    if (!url || typeof url !== 'string') throw new Error('url is invalid');
    return new Promise((resolve, reject) => {
      request.get({ url }, (err, httpResponse, body) => {
        if (err) return reject(err);
        resolve(body);
      });
    });
  }
}
