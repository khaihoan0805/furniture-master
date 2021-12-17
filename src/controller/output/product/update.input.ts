import { PRODUCT_OUTPUT } from "../../../const";
import { IProductDomain } from "../../../domain";
import { constructorProvide } from "../../../infrastructure/ioc";
import { IUpdateOutput, UpdateOutput } from "../base";

export interface IUpdateProductOutput extends IUpdateOutput<IProductDomain> { }

@constructorProvide(PRODUCT_OUTPUT.UPDATE)
export class UpdateProductOutput extends UpdateOutput<IProductDomain> implements IUpdateProductOutput {
    constructor(output: IUpdateProductOutput) {
        super(output)
    }

    get response() {
        const { message } = this;

        return { message }
    }
}