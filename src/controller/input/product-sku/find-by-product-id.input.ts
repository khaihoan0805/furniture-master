import { Request } from "express";
import { PRODUCT_SKU_INPUT } from "../../../const";
import { BaseHttpInput, IBaseHttpInput } from "../../../infrastructure/base";
import { constructorProvide } from "../../../infrastructure/ioc";


export interface IFindProductSKUByProductIdInput extends IBaseHttpInput {
    productId: number | string;
}

@constructorProvide(PRODUCT_SKU_INPUT.FIND_BY_PRODUCT_ID)
export class FindProductSKUByProductIdInput extends BaseHttpInput<IFindProductSKUByProductIdInput> implements IFindProductSKUByProductIdInput {
    constructor(req: Request) {
        super(req)
    }

    get productId() {
        return this.input.productId;
    }
}