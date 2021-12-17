import { PRODUCT_SKU_ATTRIBUTE_VALUE_OUTPUT } from "../../../const";
import { IProductSKUAttributeValueDomain } from "../../../domain";
import { constructorProvide } from "../../../infrastructure/ioc";
import { FindByIdOutput, IFindByIdOutput } from "../base";

export interface IFindProductSKUAttributeValueByIdOutput extends IFindByIdOutput<IProductSKUAttributeValueDomain> {}

@constructorProvide(PRODUCT_SKU_ATTRIBUTE_VALUE_OUTPUT.FIND_BY_ID)
export class FindProductSKUAttributeValueByIdOutput extends FindByIdOutput<IProductSKUAttributeValueDomain> implements IFindProductSKUAttributeValueByIdOutput {
    constructor(output: IFindProductSKUAttributeValueByIdOutput) {
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