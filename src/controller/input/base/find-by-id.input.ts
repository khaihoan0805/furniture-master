import { Request } from "express";
import { BaseHttpInput, IBaseHttpInput } from "../../../infrastructure/base";
import { injectable } from '../../../infrastructure/ioc';

export interface IFindByIdInput extends IBaseHttpInput {
    id: number;
}

@injectable()
export class FindByIdInput<I extends IFindByIdInput> extends BaseHttpInput<I> implements IFindByIdInput {
    constructor(req: Request) {
        super(req)
    }

    get id() {
        return this.input.id;
    }
}

