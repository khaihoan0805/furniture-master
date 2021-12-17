import { Request } from "express";
import { BaseHttpInput, IBaseHttpInput, IDomain } from "../../../infrastructure/base";
import { injectable } from '../../../infrastructure/ioc';

export interface ICreateInput extends IBaseHttpInput {}

@injectable()
export class CreateInput<I extends ICreateInput> extends BaseHttpInput<I> {
    constructor(req: Request) {
        super(req)
    }
}

