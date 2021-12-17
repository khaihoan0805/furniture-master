import { Request } from "express";
import { PRODUCT_ATTRIBUTE_INPUT } from "../../../const";
import { constructorProvide } from "../../../infrastructure/ioc";
import { CreateInput, ICreateInput } from "../base";

export interface ICreateProductAttributeInput extends ICreateInput {
    productId: number;
    attributeId: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;
}

@constructorProvide(PRODUCT_ATTRIBUTE_INPUT.CREATE)
export class CreateProductAttributeInput extends CreateInput<ICreateProductAttributeInput> implements ICreateProductAttributeInput {
    constructor(req: Request) {
        super(req)
    }

    get productId() {
        return this.input.productId;
    }

    get attributeId() {
        return this.input.attributeId;
    }

    get status() {
        return this.input.status;
    }

    get createdAt() {
        return this.input.createdAt;
    }

    get updatedAt() {
        return this.input.updatedAt;
    }
}
