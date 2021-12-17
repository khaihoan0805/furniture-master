import { Request } from "express";
import { PRODUCT_ATTRIBUTE_INPUT } from "../../../const";
import { constructorProvide } from "../../../infrastructure/ioc";
import { IUpdateInput, UpdateInput } from "../base";

export interface IUpdateProductAttributeInput extends IUpdateInput {
    productId?: number;
    attributeId?: number;
    status?: number;
    updatedAt?: Date;
}

@constructorProvide(PRODUCT_ATTRIBUTE_INPUT.UPDATE)
export class UpdateProductAttributeInput extends UpdateInput<IUpdateProductAttributeInput> implements IUpdateProductAttributeInput {
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

    get updatedAt() {
        return this.input.updatedAt;
    }
}