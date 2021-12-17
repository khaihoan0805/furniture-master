import { IError } from '../index';

export class InternalServerError extends Error implements IError {
  public readonly status: number;
  public readonly type: string;
  public readonly details: any;

  constructor(message: string) {
    super();

    this.message = message;
    this.stack = Error().stack;
    this.status = 500;
    this.type = 'InternalServerError';

    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}
