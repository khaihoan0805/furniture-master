import { Request } from "express";
import { injectable } from '../../ioc';

export interface IBaseHttpInput {}

injectable()
export class BaseHttpInput<I extends IBaseHttpInput> {
    protected input: I;

    constructor(req: Request) {
        this.input = {
            ...req.body,
            ...req.query,
            ...req.params
        }
    }
}