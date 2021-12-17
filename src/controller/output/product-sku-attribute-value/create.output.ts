import { PRODUCT_SKU_ATTRIBUTE_VALUE_OUTPUT } from "../../../const";
import { IProductSKUAttributeValueDomain } from "../../../domain";
import { constructorProvide } from "../../../infrastructure/ioc";
import { CreateOutput, ICreateOutput } from "../base";

export interface ICreateProductSKUAttributeValueOutput extends ICreateOutput<IProductSKUAttributeValueDomain> {}

@constructorProvide(PRODUCT_SKU_ATTRIBUTE_VALUE_OUTPUT.CREATE)
export class CreateProductSKUAttributeValueOutput extends CreateOutput<IProductSKUAttributeValueDomain> implements ICreateProductSKUAttributeValueOutput {
    constructor(output: ICreateProductSKUAttributeValueOutput) {
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