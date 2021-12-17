import { NextFunction, Request, Response, RequestHandler } from 'express';
import { Transaction } from 'sequelize/types';
import { NAMES, TYPES } from '../../../../const';
import { PostgresDatabase } from '../../../database';
import { inject, namedInject, singletonProvide } from '../../../ioc';
import { container } from '../../../../index';
import { Context, IContextService } from '../../../service';

export type ControllerResult = {
    httpCode?: number;
    headers?: { [key: string]: string };
    content: any;
};

export interface IInterceptor {
    intercept(controller: symbol, method: string): RequestHandler
}

@singletonProvide(TYPES.INTERCEPTOR)
export class Interceptor {

    constructor(
        @namedInject(TYPES.DATABASE, NAMES.POSTGRES)
        protected database: PostgresDatabase,

        @inject(TYPES.CONTEXT_SERVICE)
        protected contextService: IContextService
    ) {

    }

    public intercept(controller: symbol, method: string): RequestHandler {
        const interceptor: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
            let transaction: Transaction

            try {
                transaction = await this.database.connection.transaction();

                const ctx = this.contextService.initRequestContext(req, transaction);
                container.rebind<Context>(TYPES.HTTP_CONTEXT).toConstantValue(ctx)

                const ctrl = container.getNamed<any>(TYPES.CONTROLLER, controller.toString());

                const result: ControllerResult = await ctrl[method](req);

                if (transaction) await transaction.commit()

                return res.status(result.httpCode || 200).json(result.content);

            } catch (error) {
                console.log(error)
                if (transaction) await transaction.rollback()
                return res.status(401).json({ error: error.message })
            }
        }

        return interceptor;
    }
}