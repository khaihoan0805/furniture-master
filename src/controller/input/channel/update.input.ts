import { Request } from "express";
import { CHANNEL_INPUT } from "../../../const";
import { constructorProvide } from "../../../infrastructure/ioc";
import { IUpdateInput, UpdateInput } from "../base";

export interface IUpdateChannelInput extends IUpdateInput {
    name?: string;
}

@constructorProvide(CHANNEL_INPUT.UPDATE)
export class UpdateChannelInput extends UpdateInput<IUpdateChannelInput> implements IUpdateChannelInput {
    constructor(req: Request) {
        super(req);
    }

    get name() {
        return this.input.name;
    }

    get updatedAt() {
        return new Date();
    }

    get updatedBy() {
        return 1;
    }
}