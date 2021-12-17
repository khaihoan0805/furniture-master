import { IError } from '../index';

export class NotFoundError extends Error implements IError {
  public readonly status: number;
  public readonly type: string;
  public readonly details: any;

  constructor(message: string) {
    super();

    this.message = message;
    this.stack = Error(this.message).stack;
    this.status = 404;
    this.type = 'NotFoundError';

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
