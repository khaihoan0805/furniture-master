import { Request } from "express";
import { PRODUCT_CATEGORY_INPUT } from "../../../const";
import { constructorProvide } from "../../../infrastructure/ioc";
import { IUpdateInput, UpdateInput } from "../base";

export interface IUpdateProductCategoryInput extends IUpdateInput {
    productId?: number;
    categoryId?: number;
    status?: number;
    updatedAt?: Date;
}

@constructorProvide(PRODUCT_CATEGORY_INPUT.UPDATE)
export class UpdateProductCategoryInput extends UpdateInput<IUpdateProductCategoryInput> implements IUpdateProductCategoryInput {
    constructor(req: Request) {
        super(req)
    }

    get productId() {
        return this.input.productId;
    }

    get categoryId() {
        return this.input.categoryId;
    }

    get status() {
        return this.input.status;
    }

    get updatedAt() {
        return new Date();
    }
}