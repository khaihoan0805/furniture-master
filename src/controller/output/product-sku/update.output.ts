import { PRODUCT_SKU_INPUT } from "../../../const";
import { IProductSKUDomain } from "../../../domain";
import { constructorProvide } from "../../../infrastructure/ioc";
import { IUpdateOutput, UpdateOutput } from "../base";

export interface IUpdateProductSKUOutput extends IUpdateOutput<IProductSKUDomain> {}

@constructorProvide(PRODUCT_SKU_INPUT.UPDATE)
export class UpdateProductSKUOutput extends UpdateOutput<IProductSKUDomain> implements IUpdateProductSKUOutput {
    constructor(output: IUpdateProductSKUOutput) {
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