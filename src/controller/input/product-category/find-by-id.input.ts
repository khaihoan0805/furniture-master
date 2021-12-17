import { Request } from "express";
import { PRODUCT_CATEGORY_INPUT } from "../../../const";
import { constructorProvide } from "../../../infrastructure/ioc";
import { FindByIdInput, IFindByIdInput } from "../base";

export interface IFindProductCategoryByIdInput extends IFindByIdInput {}

@constructorProvide(PRODUCT_CATEGORY_INPUT.FIND_BY_ID)
export class FindProductCategoryByIdInput extends FindByIdInput<IFindProductCategoryByIdInput> implements IFindProductCategoryByIdInput {
    constructor(req: Request) {
        super(req)
    }
}