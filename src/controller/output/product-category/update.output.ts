import { PRODUCT_CATEGORY_OUTPUT } from "../../../const";
import { IProductCategoryDomain } from "../../../domain";
import { constructorProvide } from "../../../infrastructure/ioc";
import { IUpdateOutput, UpdateOutput } from "../base";

export interface IUpdateProductCategoryOutput extends IUpdateOutput<IProductCategoryDomain> {}

@constructorProvide(PRODUCT_CATEGORY_OUTPUT.UPDATE)
export class UpdateProductCategoryOutput extends UpdateOutput<IProductCategoryDomain> implements IUpdateProductCategoryOutput {
    constructor(output: IUpdateProductCategoryOutput) {
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