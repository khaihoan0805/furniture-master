import { Request } from "express";
import { ATTRIBUTE_INPUT, ATTRIBUTE_OUTPUT, ATTRIBUTE_WORKFLOW, CONTROLLER, TYPES } from "../../../const";
import { ControllerResult } from "../../../infrastructure";
import { BaseController } from "../../../infrastructure/base";
import { inject, interfaces, namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { ICreateAttributeWorkflow, IFindAttributeByIdWorkflow } from "../../../workflow";
import { ICreateAttributeInput, IFindAttributeByIdInput } from "../../input";
import { ICreateAttributeOutput, IFindAttributeByIdOutput } from "../../output";

export interface IAttributeController {
    createAttribute(req: Request): Promise<ControllerResult>;
    findAttributeById(req: Request): Promise<ControllerResult>;
}

@singletonNamedProvide(TYPES.CONTROLLER, CONTROLLER.ATTRIBUTE)
export class AttributeController extends BaseController implements IAttributeController {
    get id() {
        return CONTROLLER.ATTRIBUTE;
    }

    @namedInject(TYPES.WORKFLOW, ATTRIBUTE_WORKFLOW.CREATE)
    protected createAttributeWorkflow: ICreateAttributeWorkflow;

    @inject(ATTRIBUTE_INPUT.CREATE)
    protected createAttributeInput: interfaces.Newable<ICreateAttributeInput>;
    @inject(ATTRIBUTE_OUTPUT.CREATE)
    protected createAttributeOutput: interfaces.Newable<ICreateAttributeOutput>;

    @namedInject(TYPES.WORKFLOW, ATTRIBUTE_WORKFLOW.FIND_BY_ID)
    protected findAttributeByIdWorkflow: IFindAttributeByIdWorkflow;

    @inject(ATTRIBUTE_INPUT.FIND_BY_ID)
    protected findAttributeByIdInput: interfaces.Newable<IFindAttributeByIdInput>;
    @inject(ATTRIBUTE_OUTPUT.FIND_BY_ID)
    protected findAttributeByIdOutput: interfaces.Newable<IFindAttributeByIdOutput>;

    async createAttribute(req: Request): Promise<ControllerResult> {
        const input = new this.createAttributeInput(req)

        const output = new this.createAttributeOutput(await this.createAttributeWorkflow.execute(input));

        return { content: output.response }
    }

    async findAttributeById(req: Request): Promise<ControllerResult> {
        const input = new this.findAttributeByIdInput(req);

        const output = new this.findAttributeByIdOutput(await this.findAttributeByIdWorkflow.execute(input))

        return { content: output.response }
    }
}