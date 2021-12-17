import { IError } from '../index';

export class UnauthorizedError extends Error implements IError {
  public readonly status: number;
  public readonly type: string;
  public readonly details: any;

  constructor(message: string) {
    super();

    this.message = message;
    this.stack = Error(this.message).stack;
    this.status = 401;
    this.type = 'UnauthorizedError';

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}
