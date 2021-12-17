import { PRODUCT_ATTRIBUTE_INPUT, PRODUCT_ATTRIBUTE_OUTPUT } from "../../../const";
import { IProductAttributeDomain } from "../../../domain";
import { constructorProvide } from "../../../infrastructure/ioc";
import { IUpdateOutput, UpdateOutput } from "../base";

export interface IUpdateProductAttributeOutput extends IUpdateOutput<IProductAttributeDomain> {}

@constructorProvide(PRODUCT_ATTRIBUTE_OUTPUT.CREATE)
export class UpdateProductAttributeOutput extends UpdateOutput<IProductAttributeDomain> implements IUpdateProductAttributeOutput {
    constructor(output: IUpdateProductAttributeOutput) {
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