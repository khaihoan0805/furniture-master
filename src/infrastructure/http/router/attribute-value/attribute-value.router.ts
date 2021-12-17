import { inject } from "inversify";
import { ApiRouter, IRouterValidator } from "..";
import { IInterceptor } from "../..";
import { ILogger } from "../../..";
import { TYPES, CONTROLLER } from "../../../../const";
import { singletonProvide } from "../../../ioc";

@singletonProvide(TYPES.ROUTER)
export class AttributeValueRouter extends ApiRouter {
    get controller() {
        return CONTROLLER.ATTRIBUTE_VALUE;
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
        this.stack.push(AttributeValueRouter.prefix);
        this.create();
        this.update();
        this.findById();
    }

    static get prefix() {
        return 'attribute-values';
    }

    // @ts-ignore
    get id() {
        return Symbol.for('ATTRIBUTE_VALUE_ROUTER');
    }

    private create() {
        this.router.post(`${this.path}/create-attribute-value`, this.validator.validate, this.interceptor.intercept(this.controller, `createAttributeValue`))
    }
    private update() {
        this.router.post(`${this.path}/update-attribute-value`, this.validator.validate, this.interceptor.intercept(this.controller, `updateAttributeValue`))
    }
    private findById() {
        this.router.post(`${this.path}/find-attribute-value-by-id`, this.validator.validate, this.interceptor.intercept(this.controller, `findAttributeValueById`))
    }
}
