import { inject, interfaces } from "inversify";
import { ICreateProductInput, ICreateProductOutput, IFindProductByCategoryIdInput, IPaginateProductInput, IPaginateProductOutput } from "../..";
import { CONTROLLER, PRODUCT_INPUT, PRODUCT_OUTPUT, PRODUCT_WORKFLOW, TYPES } from "../../../const";
import { ControllerResult } from "../../../infrastructure";
import { BaseController } from "../../../infrastructure/base";
import { singletonNamedProvide, namedInject } from "../../../infrastructure/ioc";
import { ICreateProductWorkflow, IFindProductByCategoryIdWorkflow, IFindProductByIdWorkflow, IPaginateProductWorkflow, IUpdateProductWorkflow } from "../../../workflow";
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

    @namedInject(TYPES.WORKFLOW, PRODUCT_WORKFLOW.CREATE)
    protected createProductWorkflow: ICreateProductWorkflow;

    @inject(PRODUCT_INPUT.CREATE)
    protected createProductInput: interfaces.Newable<ICreateProductInput>;
    @inject(PRODUCT_OUTPUT.CREATE)
    protected createProductOutput: interfaces.Newable<ICreateProductOutput>;

    @namedInject(TYPES.WORKFLOW, PRODUCT_WORKFLOW.FIND_BY_ID)
    protected findProductByIdWorkflow: IFindProductByIdWorkflow;

    @inject(PRODUCT_INPUT.FIND_BY_ID)
    protected findProductByIdInput: interfaces.Newable<IFindProductByIdInput>;
    @inject(PRODUCT_OUTPUT.FIND_BY_ID)
    protected findProductByIdOutput: interfaces.Newable<IFindProductByIdOutput>;

    @namedInject(TYPES.WORKFLOW, PRODUCT_WORKFLOW.UPDATE)
    protected updateProductWorkflow: IUpdateProductWorkflow;

    @inject(PRODUCT_INPUT.UPDATE)
    protected updateProductInput: interfaces.Newable<IUpdateProductInput>;
    @inject(PRODUCT_OUTPUT.UPDATE)
    protected updateProductOutput: interfaces.Newable<IUpdateProductOutput>;

    @namedInject(TYPES.WORKFLOW, PRODUCT_WORKFLOW.PAGINATE)
    protected paginateProductWorkflow: IPaginateProductWorkflow;

    @inject(PRODUCT_INPUT.PAGINATE)
    protected paginateProductInput: interfaces.Newable<IPaginateProductInput>;
    @inject(PRODUCT_OUTPUT.PAGINATE)
    protected paginateProductOutput: interfaces.Newable<IPaginateProductOutput>;
    
    @namedInject(TYPES.WORKFLOW, PRODUCT_WORKFLOW.FIND_BY_CATEGORY_ID)
    protected findProductByCategoryIdWorkflow: IFindProductByCategoryIdWorkflow;

    @inject(PRODUCT_INPUT.FIND_BY_CATEGORY_ID)
    protected findProductByCategoryIdInput: interfaces.Newable<IFindProductByCategoryIdInput>;
    @inject(PRODUCT_OUTPUT.FIND_BY_CATEGORY_ID)
    protected findProductByCategoryIdOutput: interfaces.Newable<IFindProductByCategoryIdOutput>;

    public async createProduct(req: Request): Promise<ControllerResult> {
        const input = new this.createProductInput(req);

        const output = new this.createProductOutput(await this.createProductWorkflow.execute(input))

        return { content: output.response }
    }

    public async findProductById(req: Request): Promise<ControllerResult> {
        const input = new this.findProductByIdInput(req);

        const output = new this.findProductByIdOutput(await this.findProductByIdWorkflow.execute(input))

        return { content: output.response }
    }

    public async updateProduct(req: Request): Promise<ControllerResult> {
        const input = new this.updateProductInput(req)

        const output = new this.updateProductOutput(await this.updateProductWorkflow.execute(input))

        return { content: output.response }
    }

    public async paginateProduct(req: Request): Promise<ControllerResult> {
        const input = new this.paginateProductInput(req)

        const output = new this.paginateProductOutput(await this.paginateProductWorkflow.execute(input))

        return { content: output.response }
    }
    public async findProductByCategoryId(req: Request): Promise<ControllerResult> {
        const input = new this.findProductByCategoryIdInput(req);

        const output = new this.findProductByCategoryIdOutput(await this.findProductByCategoryIdWorkflow.execute(input))

        return { content: output.response }
    }
}