import { Request } from "express";
import { PRODUCT_CATEGORY_INPUT } from "../../../const";
import { constructorProvide } from "../../../infrastructure/ioc";
import { CreateInput, ICreateInput } from "../base";

export interface ICreateProductCategoryInput extends ICreateInput {
    productId: number;
    categoryId: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;
}

@constructorProvide(PRODUCT_CATEGORY_INPUT.CREATE)
export class CreateProductCategoryInput extends CreateInput<ICreateProductCategoryInput> implements ICreateProductCategoryInput {
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

    get createdAt() {
        return new Date();
    }

    get updatedAt() {
        return new Date();
    }
}