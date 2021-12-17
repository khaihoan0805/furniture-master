import { Request } from "express";
import { PRODUCT_OUTPUT } from "../../../const";
import { IProductDomain, ProductDomain } from "../../../domain";
import { constructorProvide, singletonProvide } from "../../../infrastructure/ioc";
import { CreateOutput, ICreateOutput } from "../base";

export interface ICreateProductOutput extends ICreateOutput<IProductDomain> {
}

@constructorProvide(PRODUCT_OUTPUT.CREATE)
export class CreateProductOutput extends CreateOutput<IProductDomain> implements ICreateProductOutput {
    constructor(output: ICreateProductOutput) {
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