import { Request } from "express";
import { ATTRIBUTE_INPUT } from "../../../const";
import { constructorProvide } from "../../../infrastructure/ioc";
import { FindByIdInput, IFindByIdInput } from "../base";

export interface IFindAttributeByIdInput extends IFindByIdInput {}

@constructorProvide(ATTRIBUTE_INPUT.FIND_BY_ID)
export class FindAttributeByIdInput extends FindByIdInput<IFindAttributeByIdInput> implements IFindAttributeByIdInput {
    constructor(req: Request) {
        super(req)
    }
}