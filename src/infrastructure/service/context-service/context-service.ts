import { Request } from 'express';
import { TYPES } from '../../../const';
import { Transaction } from '../../database';
import { inject, singletonProvide } from '../../ioc';
import { IJwtHelper, IObjectHelper } from '../../utils';
import { Context } from './context-entity';

export interface IContextService {
    initRequestContext(req: Request, transaction: Transaction): Context;
}

@singletonProvide(TYPES.CONTEXT_SERVICE)
export class ContextService {
    @inject(TYPES.OBJECT_HELPER)
    protected objectHelper: IObjectHelper;

    @inject(TYPES.JWT_HELPER)
    protected jwtHelper: IJwtHelper;

    public initRequestContext(req: Request, transaction: Transaction): Context {
        const ctx = new Context(
            this.objectHelper.pick(req, ['params', 'query', 'body', 'header', 'protocol', 'originalUrl']),
            transaction
        );

        return ctx;
    }
}