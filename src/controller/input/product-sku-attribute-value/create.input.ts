import { Request } from "express";
import { PRODUCT_SKU_ATTRIBUTE_VALUE_INPUT } from "../../../const";
import { constructorProvide } from "../../../infrastructure/ioc";
import { CreateInput, ICreateInput } from "../base";

export interface ICreateProductSKUAttributeValueInput extends ICreateInput {
    skuId: number;
    attributeId: number;
    attributeValueId: number;
    attributeName: string;
    attributeValue: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
}
@constructorProvide(PRODUCT_SKU_ATTRIBUTE_VALUE_INPUT.CREATE)
export class CreateProductSKUAttributeValueInput extends CreateInput<ICreateProductSKUAttributeValueInput> implements ICreateProductSKUAttributeValueInput {
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