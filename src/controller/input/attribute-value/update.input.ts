import { Request } from "express";
import { ATTRIBUTE_VALUE_OUTPUT } from "../../../const";
import { constructorProvide } from "../../../infrastructure/ioc";
import { IUpdateInput, UpdateInput } from "../base";

export interface IUpdateAttributeValueInput extends IUpdateInput {
    attributeId?: number;
    value?: string;
    status?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

@constructorProvide(ATTRIBUTE_VALUE_OUTPUT.UPDATE)
export class UpdateAttributeValueInput extends UpdateInput<IUpdateAttributeValueInput> implements IUpdateAttributeValueInput {
    constructor(req: Request) {
        super(req)
    }

    get attributeId() {
        return this.input.attributeId;
    }

    get value() {
        return this.input.value;
    }

    get status() {
        return this.input.status;
    }

    get updatedAt() {
        return this.input.updatedAt;
    }
}