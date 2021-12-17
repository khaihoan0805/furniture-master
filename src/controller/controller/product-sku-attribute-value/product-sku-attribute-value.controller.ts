import { inject, interfaces } from "inversify";
import { ICreateProductSKUAttributeValueInput, ICreateProductSKUAttributeValueOutput, IFindProductSKUAttributeValueByIdInput, IFindProductSKUAttributeValueByIdOutput, IUpdateProductSKUAttributeValueOutput } from "../..";
import { CONTROLLER, PRODUCT_SKU_ATTRIBUTE_VALUE_INPUT, PRODUCT_SKU_ATTRIBUTE_VALUE_OUTPUT, PRODUCT_SKU_ATTRIBUTE_VALUE_WORKFLOW, TYPES } from "../../../const";
import { ControllerResult } from "../../../infrastructure";
import { BaseController } from "../../../infrastructure/base";
import { singletonNamedProvide, namedInject } from "../../../infrastructure/ioc";
import { ICreateProductSKUAttributeValueWorkflow, IFindProductSKUAttributeValueByIdWorkflow, IUpdateProductSKUAttributeValueWorkflow } from "../../../workflow";
import { IUpdateProductSKUAttributeValueInput } from "../../input/product-sku-attribute-value/update.input";

export interface IProductSKUAttributeValueController {
    createProductSKUAttributeValue(req: Request): Promise<ControllerResult>;
    findProductSKUAttributeValueById(req: Request): Promise<ControllerResult>;
    updateProductSKUAttributeValue(req: Request): Promise<ControllerResult>;
}

@singletonNamedProvide(TYPES.CONTROLLER, CONTROLLER.PRODUCT_ATTRIBUTE)
export class ProductSKUAttributeValueController extends BaseController implements IProductSKUAttributeValueController {
    get id() {
        return CONTROLLER.PRODUCT_ATTRIBUTE;
    }

    @namedInject(TYPES.WORKFLOW, PRODUCT_SKU_ATTRIBUTE_VALUE_WORKFLOW.CREATE)
    protected createProductSKUAttributeValueWorkflow: ICreateProductSKUAttributeValueWorkflow;

    @inject(PRODUCT_SKU_ATTRIBUTE_VALUE_INPUT.CREATE)
    protected createProductSKUAttributeValueInput: interfaces.Newable<ICreateProductSKUAttributeValueInput>;
    @inject(PRODUCT_SKU_ATTRIBUTE_VALUE_OUTPUT.CREATE)
    protected createProductSKUAttributeValueOutput: interfaces.Newable<ICreateProductSKUAttributeValueOutput>;

    @namedInject(TYPES.WORKFLOW, PRODUCT_SKU_ATTRIBUTE_VALUE_WORKFLOW.FIND_BY_ID)
    protected findProductSKUAttributeValueByIdWorkflow: IFindProductSKUAttributeValueByIdWorkflow;

    @inject(PRODUCT_SKU_ATTRIBUTE_VALUE_INPUT.FIND_BY_ID)
    protected findProductSKUAttributeValueByIdInput: interfaces.Newable<IFindProductSKUAttributeValueByIdInput>;
    @inject(PRODUCT_SKU_ATTRIBUTE_VALUE_OUTPUT.FIND_BY_ID)
    protected findProductSKUAttributeValueByIdOutput: interfaces.Newable<IFindProductSKUAttributeValueByIdOutput>;

    @namedInject(TYPES.WORKFLOW, PRODUCT_SKU_ATTRIBUTE_VALUE_WORKFLOW.CREATE)
    protected updateProductSKUAttributeValueWorkflow: IUpdateProductSKUAttributeValueWorkflow;

    @inject(PRODUCT_SKU_ATTRIBUTE_VALUE_INPUT.CREATE)
    protected updateProductSKUAttributeValueInput: interfaces.Newable<IUpdateProductSKUAttributeValueInput>;
    @inject(PRODUCT_SKU_ATTRIBUTE_VALUE_OUTPUT.CREATE)
    protected updateProductSKUAttributeValueOutput: interfaces.Newable<IUpdateProductSKUAttributeValueOutput>;

    public async createProductSKUAttributeValue(req: Request): Promise<ControllerResult> {
        const input = new this.createProductSKUAttributeValueInput(req);

        const output = new this.createProductSKUAttributeValueOutput(await this.createProductSKUAttributeValueWorkflow.execute(input))

        return { content: output.response }
    }

    public async findProductSKUAttributeValueById(req: Request): Promise<ControllerResult> {
        const input = new this.findProductSKUAttributeValueByIdInput(req);

        const output = new this.findProductSKUAttributeValueByIdOutput(await this.findProductSKUAttributeValueByIdWorkflow.execute(input))

        return { content: output.response }
    }

    public async updateProductSKUAttributeValue(req: Request): Promise<ControllerResult> {
        const input = new this.updateProductSKUAttributeValueInput(req)

        const output = new this.updateProductSKUAttributeValueOutput(await this.updateProductSKUAttributeValueWorkflow.execute(input))

        return { content: output.response }
    }
}