import { Request } from "express";
import { CHANNEL_INPUT } from "../../../const";
import { constructorProvide } from "../../../infrastructure/ioc";
import { CreateInput, ICreateInput } from "../base";

export interface ICreateChannelInput extends ICreateInput {
    name: string
}

@constructorProvide(CHANNEL_INPUT.CREATE)
export class CreateChannelInput extends CreateInput<ICreateChannelInput> implements ICreateChannelInput {
    constructor(req: Request) {
        super(req);
    }

    get name() {
        return this.input.name;
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