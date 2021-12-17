import { inject } from "inversify";
import { ApiRouter, IRouterValidator } from "..";
import { IInterceptor } from "../..";
import { ILogger } from "../../..";
import { TYPES, CONTROLLER } from "../../../../const";
import { singletonProvide } from "../../../ioc";

@singletonProvide(TYPES.ROUTER)
export class ProductRouter extends ApiRouter {
    get controller() {
        return CONTROLLER.PRODUCT;
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
        this.stack.push(ProductRouter.prefix);
        this.create();
        this.update();
        this.findById();
        this.paignate();
        this.findByCategoryId();
    }

    static get prefix() {
        return 'products';
    }

    // @ts-ignore
    get id() {
        return Symbol.for('PRODUCT_ROUTER');
    }

    private create() {
        this.router.post(`${this.path}/create-product`, this.validator.validate, this.interceptor.intercept(this.controller, `createProduct`))
    }

    private update() {
        this.router.post(`${this.path}/update-product`, this.validator.validate, this.interceptor.intercept(this.controller, `updateProduct`))
    }

    private findById() {
        this.router.get(`${this.path}/find-product-by-id`, this.validator.validate, this.interceptor.intercept(this.controller, `findProductById`))
    }

    private paignate() {
        this.router.get(`${this.path}/paginate-product`, this.validator.validate, this.interceptor.intercept(this.controller, `paginateProduct`))
    }

    private findByCategoryId() {
        this.router.get(`${this.path}/find-by-category-id`, this.validator.validate, this.interceptor.intercept(this.controller, `findProductByCategoryId`))
    }
}
