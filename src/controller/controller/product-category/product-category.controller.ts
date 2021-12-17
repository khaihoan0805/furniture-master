import { inject, interfaces } from "inversify";
import { ICreateProductCategoryInput, ICreateProductCategoryOutput, IFindProductCategoryByIdInput, IFindProductCategoryByIdOutput, IUpdateProductCategoryInput, IUpdateProductCategoryOutput } from "../..";
import { CONTROLLER, PRODUCT_ATTRIBUTE_OUTPUT, PRODUCT_CATEGORY_INPUT, PRODUCT_CATEGORY_USECASE, TYPES } from "../../../const";
import { ControllerResult } from "../../../infrastructure";
import { BaseController } from "../../../infrastructure/base";
import { singletonNamedProvide, namedInject } from "../../../infrastructure/ioc";
import { ICreateProductCategoryUsecase, IFindProductCategoryByIdUsecase, IUpdateProductCategoryUsecase } from "../../../usecase";

export interface IProductCategoryController {
    createProductCategory(req: Request): Promise<ControllerResult>;
    findProductCategoryById(req: Request): Promise<ControllerResult>;
    updateProductCategory(req: Request): Promise<ControllerResult>;
}

@singletonNamedProvide(TYPES.CONTROLLER, CONTROLLER.PRODUCT_CATEGORY)
export class ProductCategoryController extends BaseController implements IProductCategoryController {
    get id() {
        return CONTROLLER.PRODUCT_ATTRIBUTE;
    }

    @namedInject(TYPES.USECASE, PRODUCT_CATEGORY_USECASE.CREATE)
    protected createProductCategoryUsecase: ICreateProductCategoryUsecase;

    @inject(PRODUCT_CATEGORY_INPUT.CREATE)
    protected createProductCategoryInput: interfaces.Newable<ICreateProductCategoryInput>;
    @inject(PRODUCT_ATTRIBUTE_OUTPUT.CREATE)
    protected createProductCategoryOutput: interfaces.Newable<ICreateProductCategoryOutput>;

    @namedInject(TYPES.USECASE, PRODUCT_CATEGORY_USECASE.FIND_BY_ID)
    protected findProductCategoryByIdUsecase: IFindProductCategoryByIdUsecase;

    @inject(PRODUCT_CATEGORY_INPUT.FIND_BY_ID)
    protected findProductCategoryByIdInput: interfaces.Newable<IFindProductCategoryByIdInput>;
    @inject(PRODUCT_ATTRIBUTE_OUTPUT.FIND_BY_ID)
    protected findProductCategoryByIdOutput: interfaces.Newable<IFindProductCategoryByIdOutput>;

    @namedInject(TYPES.USECASE, PRODUCT_CATEGORY_USECASE.CREATE)
    protected updateProductCategoryUsecase: IUpdateProductCategoryUsecase;

    @inject(PRODUCT_CATEGORY_INPUT.CREATE)
    protected updateProductCategoryInput: interfaces.Newable<IUpdateProductCategoryInput>;
    @inject(PRODUCT_ATTRIBUTE_OUTPUT.CREATE)
    protected updateProductCategoryOutput: interfaces.Newable<IUpdateProductCategoryOutput>;

    public async createProductCategory(req: Request): Promise<ControllerResult> {
        const input = new this.createProductCategoryInput(req);

        const output = new this.createProductCategoryOutput(await this.createProductCategoryUsecase.execute(input))

        return { content: output.response }
    }

    public async findProductCategoryById(req: Request): Promise<ControllerResult> {
        const input = new this.findProductCategoryByIdInput(req);

        const output = new this.findProductCategoryByIdOutput(await this.findProductCategoryByIdUsecase.execute(input))

        return { content: output.response }
    }

    public async updateProductCategory(req: Request): Promise<ControllerResult> {
        const input = new this.updateProductCategoryInput(req)

        const output = new this.updateProductCategoryOutput(await this.updateProductCategoryUsecase.execute(input))

        return { content: output.response }
    }
}