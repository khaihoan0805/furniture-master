import { Request } from "express";
import { ATTRIBUTE_INPUT } from "../../../const";
import { IAttribute } from "../../../domain";
import { constructorProvide } from "../../../infrastructure/ioc";
import { CreateInput, ICreateInput } from "../base";

export interface ICreateAttributeInput extends ICreateInput, IAttribute {}

@constructorProvide(ATTRIBUTE_INPUT.CREATE)
export class CreateAttributeInput extends CreateInput<ICreateAttributeInput> implements ICreateAttributeInput {
    constructor(req: Request) {
        super(req)
    }

    get name() {
        return this.input.name;
    }

    get status() {
        return this.input.status ? this.input.status : 1;
    }

    get createdAt() {
        return new Date();
    }

    get createdBy() {
        return 1;
    }

    get updatedAt() {
        return new Date();
    }

    get updatedBy() {
        return 1;
    }
}