import { ApiRouter } from '../api';
import { IRouterValidator } from '../base/router-validator';
import { inject, namedInject, singletonProvide, interfaces } from '../../../ioc';
import { ILogger } from '../../../utils';
import { TYPES } from "../../../../const";
import { CONTROLLER } from '../../../../const/controller';
import { IInterceptor } from '../../middleware';

@singletonProvide(TYPES.ROUTER)
export class AuthRouter extends ApiRouter {
    get controller() {
        return CONTROLLER.AUTH
    }

    constructor(
        @inject(TYPES.INTERCEPTOR)
        protected interceptor: IInterceptor,
        @inject(TYPES.LOGGER)
        logger: ILogger,
        @inject(TYPES.ROUTER_VALIDATOR)
        validator: IRouterValidator,
    ) {
        super(logger, validator);
        this.stack.push(AuthRouter.prefix);
        this.create();
    }

    static get prefix() {
        return 'auths';
    }

    // @ts-ignore
    get id() {
        return Symbol.for('AUTH_ROUTER');
    }

    private create() {
        this.router.post(`${this.path}/sign-in`, this.validator.validate, this.interceptor.intercept(this.controller, `signIn`))
    }
}
