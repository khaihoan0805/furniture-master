import { Request } from "express";
import { PRODUCT_SKU_ATTRIBUTE_VALUE_INPUT } from "../../../const";
import { constructorProvide } from "../../../infrastructure/ioc";
import { FindByIdInput, IFindByIdInput } from "../base";

export interface IFindProductSKUAttributeValueByIdInput extends IFindByIdInput {}

@constructorProvide(PRODUCT_SKU_ATTRIBUTE_VALUE_INPUT.FIND_BY_ID)
export class FindProductSKUAttributeValueByIdInput extends FindByIdInput<IFindProductSKUAttributeValueByIdInput> implements IFindProductSKUAttributeValueByIdInput {
    constructor(req: Request) {
        super(req)
    }
}