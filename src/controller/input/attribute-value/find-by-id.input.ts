import { Request } from "express";
import { FindByIdInput, IFindByIdInput } from "../base";

export interface IFindAttributeValueByIdInput extends IFindByIdInput {}

export class FindAttributeValueByIdInput extends FindByIdInput<IFindAttributeValueByIdInput> implements IFindAttributeValueByIdInput {
    constructor(req: Request) {
        super(req)
    }
}