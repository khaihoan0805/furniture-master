import { Request } from "express";
import { IUpdateInput, UpdateInput } from "../base";

export interface IUpdateProductSKUAttributeValueInput extends IUpdateInput {
    skuId?: number;
    attributeId?: number;
    attributeValueId?: number;
    attributeName?: string;
    attributeValue?: string;
    status?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export class UpdateProductSKUAttributeValueInput extends UpdateInput<IUpdateProductSKUAttributeValueInput> implements IUpdateProductSKUAttributeValueInput {
    constructor(req: Request) {
        super(req)
    }
    
    get attributeId() {
        return this.input.attributeId;
    }

    get attributeValueId() {
        return this.input.attributeValueId;
    }

    get attributeName() {
        return this.input.attributeName;
    }

    get attributeValue() {
        return this.input.attributeValue;
    }

    get skuId() {
        return this.input.skuId;
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