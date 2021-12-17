import { IError } from './index';
import {
    BadRequestError, 
    ForbiddenError, 
    InternalServerError, 
    NotFoundError, 
    UnauthorizedError
} from './errors';
import { TYPES } from '../../const';
import { singletonProvide } from '../ioc';


export interface IErrorFactory {
    badRequestError(message: string, details?: any): IError;
    notFoundError(message: string): IError;
    unauthorizedError(message: string): IError;
    internalServerError(message: string): IError;
    forbiddenError(message: string): IError;
}

@singletonProvide(TYPES.ERROR_FACTORY)
export class ErrorFactory implements IErrorFactory {
    badRequestError(message: string, details?: any): BadRequestError {
        return new BadRequestError(message, details);
    }

    notFoundError(message: string): NotFoundError {
        return new NotFoundError(message);
    }

    unauthorizedError(message: string): UnauthorizedError {
        return new UnauthorizedError(message);
    }

    internalServerError(message: string): InternalServerError {
        return new InternalServerError(message);
    }

    forbiddenError(message: string): ForbiddenError {
        return new ForbiddenError(message);
    }
}