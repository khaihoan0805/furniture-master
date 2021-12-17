import { ATTRIBUTE_VALUE_INPUT, ATTRIBUTE_VALUE_OUTPUT, ATTRIBUTE_VALUE_WORKFLOW, CONTROLLER, TYPES } from "../../../const";
import { ControllerResult } from "../../../infrastructure";
import { BaseController } from "../../../infrastructure/base";
import { inject, interfaces, namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { ICreateAttributeValueWorkflow, IFindAttributeValueByIdWorkflow } from "../../../workflow";
import { ICreateAttributeValueInput, IFindAttributeValueByIdInput } from "../../input";
import { ICreateAttributeValueOutput, IFIndAttributeValuebyIdOutput } from "../../output";

export interface IAttributeValueController {
    createAttributeValue(req: Request): Promise<ControllerResult>;
    updateAttributeValue(req: Request): Promise<ControllerResult>;
    findAttributeValueById(req: Request): Promise<ControllerResult>;
}

@singletonNamedProvide(TYPES.CONTROLLER, CONTROLLER.ATTRIBUTE_VALUE)
export class AttributeValueController extends BaseController implements IAttributeValueController {
    get id() {
        return CONTROLLER.ATTRIBUTE_VALUE;
    }

    @namedInject(TYPES.WORKFLOW, ATTRIBUTE_VALUE_WORKFLOW.CREATE)
    protected createAttributeValueWorkflow: ICreateAttributeValueWorkflow;

    @inject(ATTRIBUTE_VALUE_INPUT.CREATE)
    protected createAttributeValueInput: interfaces.Newable<ICreateAttributeValueInput>;
    @inject(ATTRIBUTE_VALUE_OUTPUT.CREATE)
    protected createAttributeValueOutput: interfaces.Newable<ICreateAttributeValueOutput>;

    @namedInject(TYPES.WORKFLOW, ATTRIBUTE_VALUE_WORKFLOW.FIND_BY_ID)
    protected findAttributeValueByIdWorkflow: IFindAttributeValueByIdWorkflow;

    @inject(ATTRIBUTE_VALUE_INPUT.FIND_BY_ID)
    protected findAttributeValueByIdInput: interfaces.Newable<IFindAttributeValueByIdInput>;
    @inject(ATTRIBUTE_VALUE_OUTPUT.FIND_BY_ID)
    protected findAttributeValueByIdOutput: interfaces.Newable<IFIndAttributeValuebyIdOutput>;

    @namedInject(TYPES.WORKFLOW, ATTRIBUTE_VALUE_WORKFLOW.UPDATE)
    protected updateAttributeValueWorkflow: IFindAttributeValueByIdWorkflow;

    @inject(ATTRIBUTE_VALUE_INPUT.UPDATE)
    protected updateAttributeValueInput: interfaces.Newable<IFindAttributeValueByIdInput>;
    @inject(ATTRIBUTE_VALUE_OUTPUT.UPDATE)
    protected updateAttributeValueOutput: interfaces.Newable<IFIndAttributeValuebyIdOutput>;

    public async createAttributeValue(req: Request): Promise<ControllerResult> {
        const input = new this.createAttributeValueInput(req);

        const output = new this.createAttributeValueOutput(await this.createAttributeValueWorkflow.execute(input))

        return { content: output.response }
    }

    public async findAttributeValueById(req: Request): Promise<ControllerResult> {
        const input = new this.findAttributeValueByIdInput(req)

        const output = new this.findAttributeValueByIdOutput(await this.findAttributeValueByIdWorkflow.execute(input))

        return { content: output.response }
    }

    public async updateAttributeValue(req: Request): Promise<ControllerResult> {
        const input = new this.updateAttributeValueInput(req)

        const output = new this.updateAttributeValueOutput(await this.updateAttributeValueWorkflow.execute(input))

        return { content: output.response }
    }
}