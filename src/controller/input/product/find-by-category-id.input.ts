import { Request } from "express";
import { PRODUCT_INPUT } from "../../../const";
import { BaseHttpInput, IBaseHttpInput } from "../../../infrastructure/base";
import { constructorProvide } from "../../../infrastructure/ioc";

export interface IFindProductByCategoryIdInput extends IBaseHttpInput {
    categoryId: number;
}

@constructorProvide(PRODUCT_INPUT.FIND_BY_CATEGORY_ID)
export class FindProductByCategoryIdInput extends BaseHttpInput<IFindProductByCategoryIdInput> implements IFindProductByCategoryIdInput {
    constructor(req: Request) {
        super(req)
    }

    get categoryId() {
        return this.input.categoryId;
    }
}