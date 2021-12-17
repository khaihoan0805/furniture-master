import { IError } from '../index';

export class ForbiddenError extends Error implements IError {
  public readonly status: number;
  public readonly type: string;
  public readonly details: any;

  constructor(message: string) {
    super();

    this.message = message;
    this.stack = Error().stack;
    this.status = 403;
    this.type = 'ForbiddenError';

    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}
