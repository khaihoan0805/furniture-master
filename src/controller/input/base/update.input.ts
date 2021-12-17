import { Request } from "express";
import { BaseHttpInput, IBaseHttpInput } from "../../../infrastructure/base";
import { injectable } from '../../../infrastructure/ioc';

export interface IUpdateInput extends IBaseHttpInput {
    id: number;
}

export class UpdateInput<I extends IUpdateInput> extends BaseHttpInput<I> implements IUpdateInput {
    constructor(req: Request) {
        super(req)
    }

    get id() {
        return this.input.id;
    }
}