import { Request } from "express";
import { ATTRIBUTE_VALUE_INPUT } from "../../../const";
import { constructorProvide } from "../../../infrastructure/ioc";
import { CreateInput, ICreateInput } from "../base";

export interface ICreateAttributeValueInput extends ICreateInput {
    attributeId: number;
    value: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
}

@constructorProvide(ATTRIBUTE_VALUE_INPUT.CREATE)
export class CreateAttributeValueInput extends CreateInput<ICreateAttributeValueInput> implements ICreateAttributeValueInput {
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

    get createdAt() {
        return this.input.createdAt;
    }

    get updatedAt() {
        return this.input.updatedAt;
    }
}

