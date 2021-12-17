import { PRODUCT_ATTRIBUTE_INPUT, PRODUCT_ATTRIBUTE_OUTPUT } from "../../../const";
import { IProductAttributeDomain } from "../../../domain";
import { constructorProvide } from "../../../infrastructure/ioc";
import { CreateOutput, ICreateOutput } from "../base";

export interface ICreateProductAttributeOutput extends ICreateOutput<IProductAttributeDomain> {}

@constructorProvide(PRODUCT_ATTRIBUTE_OUTPUT.CREATE)
export class CreateProductAttributeOutput extends CreateOutput<IProductAttributeDomain> implements ICreateProductAttributeOutput {
    constructor(output: ICreateProductAttributeOutput) {
        super(output)
    }
}