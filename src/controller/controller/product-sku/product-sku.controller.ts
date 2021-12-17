import { inject, interfaces } from "inversify";
import { ICreateProductSKUInput, ICreateProductSKUOutput, IFindProductSKUByIdInput, IFindProductSKUByIdOutput, IUpdateProductSKUInput, IUpdateProductSKUOutput } from "../..";
import { CONTROLLER, PRODUCT_SKU_INPUT, PRODUCT_SKU_OUTPUT, PRODUCT_SKU_USECASE, TYPES } from "../../../const";
import { ControllerResult } from "../../../infrastructure";
import { BaseController } from "../../../infrastructure/base";
import { singletonNamedProvide, namedInject } from "../../../infrastructure/ioc";
import { ICreateProductSKUUsecase, IFindProductSKUByIdUsecase, IUpdateProductSKUUsecase } from "../../../usecase";

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

    @namedInject(TYPES.USECASE, PRODUCT_SKU_USECASE.CREATE)
    protected createProductSKUUsecase: ICreateProductSKUUsecase;

    @inject(PRODUCT_SKU_INPUT.CREATE)
    protected createProductSKUInput: interfaces.Newable<ICreateProductSKUInput>;
    @inject(PRODUCT_SKU_OUTPUT.CREATE)
    protected createProductSKUOutput: interfaces.Newable<ICreateProductSKUOutput>;

    @namedInject(TYPES.USECASE, PRODUCT_SKU_USECASE.FIND_BY_ID)
    protected findProductSKUByIdUsecase: IFindProductSKUByIdUsecase;

    @inject(PRODUCT_SKU_INPUT.FIND_BY_ID)
    protected findProductSKUByIdInput: interfaces.Newable<IFindProductSKUByIdInput>;
    @inject(PRODUCT_SKU_OUTPUT.FIND_BY_ID)
    protected findProductSKUByIdOutput: interfaces.Newable<IFindProductSKUByIdOutput>;

    @namedInject(TYPES.USECASE, PRODUCT_SKU_USECASE.CREATE)
    protected updateProductSKUUsecase: IUpdateProductSKUUsecase;

    @inject(PRODUCT_SKU_INPUT.CREATE)
    protected updateProductSKUInput: interfaces.Newable<IUpdateProductSKUInput>;
    @inject(PRODUCT_SKU_OUTPUT.CREATE)
    protected updateProductSKUOutput: interfaces.Newable<IUpdateProductSKUOutput>;

    public async createProductSKU(req: Request): Promise<ControllerResult> {
        const input = new this.createProductSKUInput(req);

        const output = new this.createProductSKUOutput(await this.createProductSKUUsecase.execute(input))

        return { content: output.response }
    }

    public async findProductSKUById(req: Request): Promise<ControllerResult> {
        const input = new this.findProductSKUByIdInput(req);

        const output = new this.findProductSKUByIdOutput(await this.findProductSKUByIdUsecase.execute(input))

        return { content: output.response }
    }

    public async updateProductSKU(req: Request): Promise<ControllerResult> {
        const input = new this.updateProductSKUInput(req)

        const output = new this.updateProductSKUOutput(await this.updateProductSKUUsecase.execute(input))

        return { content: output.response }
    }
}