import { ApiRouter } from '../api';
import { IRouterValidator } from '../base/router-validator';
import { inject, namedInject, singletonProvide, interfaces } from '../../../ioc';
import { ILogger } from '../../../utils';
import { TYPES } from "../../../../const";
import { CONTROLLER } from '../../../../const/controller';
import { IInterceptor } from '../../middleware';

@singletonProvide(TYPES.ROUTER)
export class AttributeRouter extends ApiRouter {
    get controller() {
        return CONTROLLER.ATTRIBUTE
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
        this.stack.push(AttributeRouter.prefix);
        this.create();
        this.findById();
    }

    static get prefix() {
        return 'attributes';
    }

    // @ts-ignore
    get id() {
        return Symbol.for('ATTRIBUTES_ROUTER');
    }

    private create() {
        this.router.post(`${this.path}/create-attribute`, this.validator.validate, this.interceptor.intercept(this.controller, `createAttribute`))
    }

    private findById() {
        this.router.get(`${this.path}/find-attribute-by-id`, this.validator.validate, this.interceptor.intercept(this.controller, `findAttributeById`))
    }
}
