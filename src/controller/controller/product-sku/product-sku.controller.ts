import { inject, interfaces } from "inversify";
import { ICreateProductSKUInput, ICreateProductSKUOutput, IFindProductSKUByIdInput, IFindProductSKUByIdOutput, IUpdateProductSKUInput, IUpdateProductSKUOutput } from "../..";
import { CONTROLLER, PRODUCT_SKU_INPUT, PRODUCT_SKU_OUTPUT, PRODUCT_SKU_WORKFLOW, TYPES } from "../../../const";
import { ControllerResult } from "../../../infrastructure";
import { BaseController } from "../../../infrastructure/base";
import { singletonNamedProvide, namedInject } from "../../../infrastructure/ioc";
import { ICreateProductSKUWorkflow, IFindProductSKUByIdWorkflow, IUpdateProductSKUWorkflow } from "../../../workflow";

export interface IProductSKUController {
    createProductSKU(req: Request): Promise<ControllerResult>;
    findProductSKUById(req: Request): Promise<ControllerResult>;
    updateProductSKU(req: Request): Promise<ControllerResult>;
}

@singletonNamedProvide(TYPES.CONTROLLER, CONTROLLER.PRODUCT_SKU)
export class ProductSKUController extends BaseController implements IProductSKUController {
    get id() {
        return CONTROLLER.PRODUCT_ATTRIBUTE;
    }

    @namedInject(TYPES.WORKFLOW, PRODUCT_SKU_WORKFLOW.CREATE)
    protected createProductSKUWorkflow: ICreateProductSKUWorkflow;

    @inject(PRODUCT_SKU_INPUT.CREATE)
    protected createProductSKUInput: interfaces.Newable<ICreateProductSKUInput>;
    @inject(PRODUCT_SKU_OUTPUT.CREATE)
    protected createProductSKUOutput: interfaces.Newable<ICreateProductSKUOutput>;

    @namedInject(TYPES.WORKFLOW, PRODUCT_SKU_WORKFLOW.FIND_BY_ID)
    protected findProductSKUByIdWorkflow: IFindProductSKUByIdWorkflow;

    @inject(PRODUCT_SKU_INPUT.FIND_BY_ID)
    protected findProductSKUByIdInput: interfaces.Newable<IFindProductSKUByIdInput>;
    @inject(PRODUCT_SKU_OUTPUT.FIND_BY_ID)
    protected findProductSKUByIdOutput: interfaces.Newable<IFindProductSKUByIdOutput>;

    @namedInject(TYPES.WORKFLOW, PRODUCT_SKU_WORKFLOW.CREATE)
    protected updateProductSKUWorkflow: IUpdateProductSKUWorkflow;

    @inject(PRODUCT_SKU_INPUT.CREATE)
    protected updateProductSKUInput: interfaces.Newable<IUpdateProductSKUInput>;
    @inject(PRODUCT_SKU_OUTPUT.CREATE)
    protected updateProductSKUOutput: interfaces.Newable<IUpdateProductSKUOutput>;

    public async createProductSKU(req: Request): Promise<ControllerResult> {
        const input = new this.createProductSKUInput(req);

        const output = new this.createProductSKUOutput(await this.createProductSKUWorkflow.execute(input))

        return { content: output.response }
    }

    public async findProductSKUById(req: Request): Promise<ControllerResult> {
        const input = new this.findProductSKUByIdInput(req);

        const output = new this.findProductSKUByIdOutput(await this.findProductSKUByIdWorkflow.execute(input))

        return { content: output.response }
    }

    public async updateProductSKU(req: Request): Promise<ControllerResult> {
        const input = new this.updateProductSKUInput(req)

        const output = new this.updateProductSKUOutput(await this.updateProductSKUWorkflow.execute(input))

        return { content: output.response }
    }
}