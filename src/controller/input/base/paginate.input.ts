import { Request } from "express";
import { BaseHttpInput, IBaseHttpInput } from "../../../infrastructure/base";
import { injectable } from '../../../infrastructure/ioc';

export interface IPaginateInput extends IBaseHttpInput {
    limit?: number;
    offset?: number;
}

@injectable()
export class PaginateInput<I extends IPaginateInput> extends BaseHttpInput<I> {
    constructor(req: Request) {
        super(req)
    }

    get limit() {
        return <number>this.input.limit;
    }

    get offset() {
        return <number>this.input.offset;
    }
}