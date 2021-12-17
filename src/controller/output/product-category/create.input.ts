import { PRODUCT_CATEGORY_OUTPUT } from "../../../const";
import { IProductCategoryDomain } from "../../../domain";
import { constructorProvide } from "../../../infrastructure/ioc";
import { CreateOutput, ICreateOutput } from "../base";

export interface ICreateProductCategoryOutput extends ICreateOutput<IProductCategoryDomain> {}

@constructorProvide(PRODUCT_CATEGORY_OUTPUT.CREATE)
export class CreateProductCategoryOutput extends CreateOutput<IProductCategoryDomain> implements ICreateProductCategoryOutput {
    constructor(output: ICreateProductCategoryOutput) {
        super(output)
    }

    get response() {
        const {
            message,
            entity
        } = this;

        return {
            message,
            entity
        }
    }
}