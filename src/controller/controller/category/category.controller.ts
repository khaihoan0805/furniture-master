import { Request } from "express";
import { CATEGORY_INPUT, CATEGORY_OUTPUT, CATEGORY_WORKFLOW, CONTROLLER, TYPES } from "../../../const";
import { ControllerResult } from "../../../infrastructure";
import { BaseController } from "../../../infrastructure/base";
import { inject, interfaces, namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { ICreateCaterogyWorkflow, IFindCategoryByIdWorkflow } from "../../../workflow";
import { ICreateCategoryInput, IFindCategoryByIdInput } from "../../input";
import { ICreateCategoryOutput, IFindCategoryByIdOutput } from "../../output";

export interface ICategoryController {
    createCategory(req: Request): Promise<ControllerResult>;
    findCategoryById(req: Request): Promise<ControllerResult>;
}

@singletonNamedProvide(TYPES.CONTROLLER, CONTROLLER.CATEGORY)
export class CategoryController extends BaseController implements ICategoryController {
    get id() {
        return CONTROLLER.CATEGORY;
    }

    @namedInject(TYPES.WORKFLOW, CATEGORY_WORKFLOW.CREATE)
    protected createCategoryWorkflow: ICreateCaterogyWorkflow;

    @inject(CATEGORY_INPUT.CREATE)
    protected createCategoryInput: interfaces.Newable<ICreateCategoryInput>;
    @inject(CATEGORY_OUTPUT.CREATE)
    protected createCategoryOutput: interfaces.Newable<ICreateCategoryOutput>;

    @namedInject(TYPES.WORKFLOW, CATEGORY_WORKFLOW.FIND_BY_ID)
    protected findCategoryByIdWorkflow: IFindCategoryByIdWorkflow;

    @inject(CATEGORY_INPUT.FIND_BY_ID)
    protected findCategoryByIdInput: interfaces.Newable<IFindCategoryByIdInput>;
    @inject(CATEGORY_OUTPUT.FIND_BY_ID)
    protected findCategoryByIdOutput: interfaces.Newable<IFindCategoryByIdOutput>;

    public async createCategory(req: Request): Promise<ControllerResult> {
        const input = new this.createCategoryInput(req);

        const output = new this.createCategoryOutput(await this.createCategoryWorkflow.execute(input))

        return { content: output.response }
    }

    public async findCategoryById(req: Request): Promise<ControllerResult> {
        const input = new this.findCategoryByIdInput(req)

        const output = new this.findCategoryByIdOutput(await this.findCategoryByIdWorkflow.execute(input))

        return { content: output.response }
    }
}