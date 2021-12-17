import { Request } from "express";
import { PRODUCT_INPUT } from "../../../const";
import { constructorProvide } from "../../../infrastructure/ioc";
import { FindByIdInput, IFindByIdInput } from "../base";

export interface IFindProductByIdInput extends IFindByIdInput {}

@constructorProvide(PRODUCT_INPUT.FIND_BY_ID)
export class FindProductByIdInput extends FindByIdInput<IFindProductByIdInput> implements IFindProductByIdInput {
    constructor(req: Request) {
        super(req)
    }
}