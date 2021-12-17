import { PRODUCT_SKU_INPUT } from "../../../const";
import { IProductSKUDomain } from "../../../domain";
import { constructorProvide } from "../../../infrastructure/ioc";
import { FindByIdOutput, IFindByIdOutput } from "../base";

export interface IFindProductSKUByIdOutput extends IFindByIdOutput<IProductSKUDomain> {}

@constructorProvide(PRODUCT_SKU_INPUT.FIND_BY_ID)
export class FindProductSKUByIdOutput extends FindByIdOutput<IProductSKUDomain> implements FindProductSKUByIdOutput {
    constructor(output: IFindProductSKUByIdOutput) {
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