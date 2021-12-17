import { PRODUCT_SKU_INPUT } from "../../../const";
import { IProductSKU, IProductSKUDomain } from "../../../domain";
import { constructorProvide } from "../../../infrastructure/ioc";
import { CreateOutput, ICreateOutput } from "../base";

export interface ICreateProductSKUOutput extends ICreateOutput<IProductSKUDomain> {}

@constructorProvide(PRODUCT_SKU_INPUT.CREATE)
export class CreateProductSKUOutput extends CreateOutput<IProductSKUDomain> implements ICreateProductSKUOutput {
    constructor(output: ICreateProductSKUOutput) {
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