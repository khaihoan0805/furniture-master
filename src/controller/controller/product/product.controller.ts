import { inject, interfaces } from "inversify";
import { ICreateProductInput, ICreateProductOutput, IFindProductByCategoryIdInput, IPaginateProductInput, IPaginateProductOutput } from "../..";
import { CONTROLLER, PRODUCT_INPUT, PRODUCT_OUTPUT, PRODUCT_USECASE, TYPES } from "../../../const";
import { ControllerResult } from "../../../infrastructure";
import { BaseController } from "../../../infrastructure/base";
import { singletonNamedProvide, namedInject } from "../../../infrastructure/ioc";
import { ICreateProductUsecase, IFindProductByCategoryIdUsecase, IFindProductByIdUsecase, IPaginateProductUsecase, IUpdateProductUsecase } from "../../../usecase";
import { IFindProductByIdInput } from "../../input/product/find-by-id.input";
import { IUpdateProductInput } from "../../input/product/update.input";
import { IFindProductByCategoryIdOutput } from "../../output";
import { IFindProductByIdOutput } from "../../output/product/find-by-id.output";
import { IUpdateProductOutput } from "../../output/product/update.input";

export interface IProductController {
    createProduct(req: Request): Promise<ControllerResult>;
    findProductById(req: Request): Promise<ControllerResult>;
    updateProduct(req: Request): Promise<ControllerResult>;
    paginateProduct(req: Request): Promise<ControllerResult>;
    findProductByCategoryId(req: Request): Promise<ControllerResult>
}

@singletonNamedProvide(TYPES.CONTROLLER, CONTROLLER.PRODUCT)
export class ProductController extends BaseController implements IProductController {
    get id() {
        return CONTROLLER.PRODUCT;
    }

    @namedInject(TYPES.USECASE, PRODUCT_USECASE.CREATE)
    protected createProductUsecase: ICreateProductUsecase;

    @inject(PRODUCT_INPUT.CREATE)
    protected createProductInput: interfaces.Newable<ICreateProductInput>;
    @inject(PRODUCT_OUTPUT.CREATE)
    protected createProductOutput: interfaces.Newable<ICreateProductOutput>;

    @namedInject(TYPES.USECASE, PRODUCT_USECASE.FIND_BY_ID)
    protected findProductByIdUsecase: IFindProductByIdUsecase;

    @inject(PRODUCT_INPUT.FIND_BY_ID)
    protected findProductByIdInput: interfaces.Newable<IFindProductByIdInput>;
    @inject(PRODUCT_OUTPUT.FIND_BY_ID)
    protected findProductByIdOutput: interfaces.Newable<IFindProductByIdOutput>;

    @namedInject(TYPES.USECASE, PRODUCT_USECASE.UPDATE)
    protected updateProductUsecase: IUpdateProductUsecase;

    @inject(PRODUCT_INPUT.UPDATE)
    protected updateProductInput: interfaces.Newable<IUpdateProductInput>;
    @inject(PRODUCT_OUTPUT.UPDATE)
    protected updateProductOutput: interfaces.Newable<IUpdateProductOutput>;

    @namedInject(TYPES.USECASE, PRODUCT_USECASE.PAGINATE)
    protected paginateProductUsecase: IPaginateProductUsecase;

    @inject(PRODUCT_INPUT.PAGINATE)
    protected paginateProductInput: interfaces.Newable<IPaginateProductInput>;
    @inject(PRODUCT_OUTPUT.PAGINATE)
    protected paginateProductOutput: interfaces.Newable<IPaginateProductOutput>;
    
    @namedInject(TYPES.USECASE, PRODUCT_USECASE.FIND_BY_CATEGORY_ID)
    protected findProductByCategoryIdUsecase: IFindProductByCategoryIdUsecase;

    @inject(PRODUCT_INPUT.FIND_BY_CATEGORY_ID)
    protected findProductByCategoryIdInput: interfaces.Newable<IFindProductByCategoryIdInput>;
    @inject(PRODUCT_OUTPUT.FIND_BY_CATEGORY_ID)
    protected findProductByCategoryIdOutput: interfaces.Newable<IFindProductByCategoryIdOutput>;

    public async createProduct(req: Request): Promise<ControllerResult> {
        const input = new this.createProductInput(req);

        const output = new this.createProductOutput(await this.createProductUsecase.execute(input))

        return { content: output.response }
    }

    public async findProductById(req: Request): Promise<ControllerResult> {
        const input = new this.findProductByIdInput(req);

        const output = new this.findProductByIdOutput(await this.findProductByIdUsecase.execute(input))

        return { content: output.response }
    }

    public async updateProduct(req: Request): Promise<ControllerResult> {
        const input = new this.updateProductInput(req)

        const output = new this.updateProductOutput(await this.updateProductUsecase.execute(input))

        return { content: output.response }
    }

    public async paginateProduct(req: Request): Promise<ControllerResult> {
        const input = new this.paginateProductInput(req)

        const output = new this.paginateProductOutput(await this.paginateProductUsecase.execute(input))

        return { content: output.response }
    }
    public async findProductByCategoryId(req: Request): Promise<ControllerResult> {
        const input = new this.findProductByCategoryIdInput(req);

        const output = new this.findProductByCategoryIdOutput(await this.findProductByCategoryIdUsecase.execute(input))

        return { content: output.response }
    }
}