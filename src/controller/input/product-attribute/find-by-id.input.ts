import { Request } from "express";
import { PRODUCT_ATTRIBUTE_INPUT } from "../../../const";
import { constructorProvide } from "../../../infrastructure/ioc";
import { FindByIdInput, IFindByIdInput } from "../base";

export interface IFindProductAttributeByIdInput extends IFindByIdInput {}

@constructorProvide(PRODUCT_ATTRIBUTE_INPUT.FIND_BY_ID)
export class FindProductAttributeByIdInput extends FindByIdInput<IFindProductAttributeByIdInput> implements IFindProductAttributeByIdInput {
    constructor(req: Request) {
        super(req)
    }
}