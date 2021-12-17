import { IError } from "../index";


export class BadRequestError extends Error implements IError {
  public readonly status: number;
  public readonly details: any;
  public readonly type: string;

  constructor(message: string, details?: any) {
    super(message);

    this.stack = Error(this.message).stack;
    this.status = 400;
    this.details = details;
    this.type = 'BadRequestError';

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
