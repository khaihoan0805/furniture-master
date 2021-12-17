import { Request } from "express";
import { PRODUCT_SKU_INPUT } from "../../../const";
import { constructorProvide } from "../../../infrastructure/ioc";
import { FindByIdInput, IFindByIdInput } from "../base";

export interface IFindProductSKUByIdInput extends IFindByIdInput {}

@constructorProvide(PRODUCT_SKU_INPUT.FIND_BY_ID)
export class FindProductSKUByIdInput extends FindByIdInput<IFindProductSKUByIdInput> implements IFindProductSKUByIdInput {
    constructor(req: Request) {
        super(req)
    }
}