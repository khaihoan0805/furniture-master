import { Request } from "express";
import { PRODUCT_SKU_INPUT } from "../../../const";
import { IProductSKUAttributeValueDomain } from "../../../domain";
import { constructorProvide } from "../../../infrastructure/ioc";
import { IUpdateInput, UpdateInput } from "../base";

export interface IUpdateProductSKUInput extends IUpdateInput {
    code?: string;
    productId?: number;
    image?: string;
    status?: number;
    quantity?: number;
    currentPrice?: number;
    price?: number;
    slug?: string;
    description?: string;
    attributeValues?: (IProductSKUAttributeValueDomain | null) | number[];
    updatedAt?: Date;
}

@constructorProvide(PRODUCT_SKU_INPUT.CREATE)
export class UpdateProductSKUINput extends UpdateInput<IUpdateProductSKUInput> implements IUpdateProductSKUInput {
    constructor(req: Request) {
        super(req)
    }

    get code() {
        return this.input.code;
    }

    get productId() {
        return this.input.productId;
    }

    get quantity() {
        return this.input.quantity;
    }

    get currentPrice() {
        return this.input.currentPrice;
    }

    get price() {
        return this.input.price;
    }

    get image() {
        return this.input.image
    }

    get description() {
        return this.input.description;
    }

    get status() {
        return this.input.status;
    }

    get slug() {
        return this.input.slug;
    }

    get updatedAt() {
        return this.input.updatedAt;
    }

    get attributeValues() {
        return this.input.attributeValues;
    }
}