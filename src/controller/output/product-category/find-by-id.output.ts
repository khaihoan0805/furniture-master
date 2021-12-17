import { PRODUCT_CATEGORY_OUTPUT } from "../../../const";
import { IProductCategoryDomain } from "../../../domain";
import { constructorProvide } from "../../../infrastructure/ioc";
import { FindByIdOutput, IFindByIdOutput } from "../base";

export interface IFindProductCategoryByIdOutput extends IFindByIdOutput<IProductCategoryDomain> { }

@constructorProvide(PRODUCT_CATEGORY_OUTPUT.FIND_BY_ID)
export class FindProductCategoryByIdOutput extends FindByIdOutput<IProductCategoryDomain> implements IFindProductCategoryByIdOutput {
    constructor(output: IFindProductCategoryByIdOutput) {
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