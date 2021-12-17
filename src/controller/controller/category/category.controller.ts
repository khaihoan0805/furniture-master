import { Request } from "express";
import { CATEGORY_INPUT, CATEGORY_OUTPUT, CATEGORY_USECASE, CONTROLLER, TYPES } from "../../../const";
import { ControllerResult } from "../../../infrastructure";
import { BaseController } from "../../../infrastructure/base";
import { inject, interfaces, namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { ICreateCaterogyUsecase, IFindCategoryByIdUsecase } from "../../../usecase";
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

    @namedInject(TYPES.USECASE, CATEGORY_USECASE.CREATE)
    protected createCategoryUsecase: ICreateCaterogyUsecase;

    @inject(CATEGORY_INPUT.CREATE)
    protected createCategoryInput: interfaces.Newable<ICreateCategoryInput>;
    @inject(CATEGORY_OUTPUT.CREATE)
    protected createCategoryOutput: interfaces.Newable<ICreateCategoryOutput>;

    @namedInject(TYPES.USECASE, CATEGORY_USECASE.FIND_BY_ID)
    protected findCategoryByIdUsecase: IFindCategoryByIdUsecase;

    @inject(CATEGORY_INPUT.FIND_BY_ID)
    protected findCategoryByIdInput: interfaces.Newable<IFindCategoryByIdInput>;
    @inject(CATEGORY_OUTPUT.FIND_BY_ID)
    protected findCategoryByIdOutput: interfaces.Newable<IFindCategoryByIdOutput>;

    public async createCategory(req: Request): Promise<ControllerResult> {
        const input = new this.createCategoryInput(req);

        const output = new this.createCategoryOutput(await this.createCategoryUsecase.execute(input))

        return { content: output.response }
    }

    public async findCategoryById(req: Request): Promise<ControllerResult> {
        const input = new this.findCategoryByIdInput(req)

        const output = new this.findCategoryByIdOutput(await this.findCategoryByIdUsecase.execute(input))

        return { content: output.response }
    }
}