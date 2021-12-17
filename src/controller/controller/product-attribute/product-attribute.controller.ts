import { inject, interfaces } from "inversify";
import { ICreateProductAttributeInput, ICreateProductAttributeOutput, IFindProductAttributeByIdInput, IFindProductAttributeByIdOutput } from "../..";
import { CONTROLLER, PRODUCT_ATTRIBUTE_INPUT, PRODUCT_ATTRIBUTE_OUTPUT, PRODUCT_ATTRIBUTE_WORKFLOW, TYPES } from "../../../const";
import { ControllerResult } from "../../../infrastructure";
import { BaseController } from "../../../infrastructure/base";
import { singletonNamedProvide, namedInject } from "../../../infrastructure/ioc";
import { ICreateProductAttributeWorkflow, IFindProductAttributeByIdWorkflow, IUpdateProductAttributeWorkflow } from "../../../workflow";
import { IUpdateProductAttributeInput } from "../../input";
import { IUpdateProductAttributeOutput } from "../../output";

export interface IProductAttributeController {
    createProductAttribute(req: Request): Promise<ControllerResult>;
    findProductAttributeById(req: Request): Promise<ControllerResult>;
    updateProductAttribute(req: Request): Promise<ControllerResult>;
}

@singletonNamedProvide(TYPES.CONTROLLER, CONTROLLER.PRODUCT_ATTRIBUTE)
export class ProductAttributeController extends BaseController implements IProductAttributeController {
    get id() {
        return CONTROLLER.PRODUCT_ATTRIBUTE;
    }

    @namedInject(TYPES.WORKFLOW, PRODUCT_ATTRIBUTE_WORKFLOW.CREATE)
    protected createProductAttributeWorkflow: ICreateProductAttributeWorkflow;

    @inject(PRODUCT_ATTRIBUTE_INPUT.CREATE)
    protected createProductAttributeInput: interfaces.Newable<ICreateProductAttributeInput>;
    @inject(PRODUCT_ATTRIBUTE_OUTPUT.CREATE)
    protected createProductAttributeOutput: interfaces.Newable<ICreateProductAttributeOutput>;

    @namedInject(TYPES.WORKFLOW, PRODUCT_ATTRIBUTE_WORKFLOW.FIND_BY_ID)
    protected findProductAttributeByIdWorkflow: IFindProductAttributeByIdWorkflow;

    @inject(PRODUCT_ATTRIBUTE_INPUT.FIND_BY_ID)
    protected findProductAttributeByIdInput: interfaces.Newable<IFindProductAttributeByIdInput>;
    @inject(PRODUCT_ATTRIBUTE_OUTPUT.FIND_BY_ID)
    protected findProductAttributeByIdOutput: interfaces.Newable<IFindProductAttributeByIdOutput>;

    @namedInject(TYPES.WORKFLOW, PRODUCT_ATTRIBUTE_WORKFLOW.CREATE)
    protected updateProductAttributeWorkflow: IUpdateProductAttributeWorkflow;

    @inject(PRODUCT_ATTRIBUTE_INPUT.CREATE)
    protected updateProductAttributeInput: interfaces.Newable<IUpdateProductAttributeInput>;
    @inject(PRODUCT_ATTRIBUTE_OUTPUT.CREATE)
    protected updateProductAttributeOutput: interfaces.Newable<IUpdateProductAttributeOutput>;

    public async createProductAttribute(req: Request): Promise<ControllerResult> {
        const input = new this.createProductAttributeInput(req);

        const output = new this.createProductAttributeOutput(await this.createProductAttributeWorkflow.execute(input))

        return { content: output.response }
    }

    public async findProductAttributeById(req: Request): Promise<ControllerResult> {
        const input = new this.findProductAttributeByIdInput(req);

        const output = new this.findProductAttributeByIdOutput(await this.findProductAttributeByIdWorkflow.execute(input))

        return { content: output.response }
    }

    public async updateProductAttribute(req: Request): Promise<ControllerResult> {
        const input = new this.updateProductAttributeInput(req)

        const output = new this.updateProductAttributeOutput(await this.updateProductAttributeWorkflow.execute(input))

        return { content: output.response }
    }
}