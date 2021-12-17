import { Request } from "express";
import { CATEGORY_INPUT } from "../../../const";
import { CategoryDomain } from "../../../domain";
import { constructorProvide } from "../../../infrastructure/ioc";
import { FindByIdInput, IFindByIdInput } from "../base";

export interface IFindCategoryByIdInput extends IFindByIdInput {}

@constructorProvide(CATEGORY_INPUT.FIND_BY_ID)
export class FindCategoryByIdInput extends FindByIdInput<CategoryDomain> implements IFindCategoryByIdInput {
    constructor(req: Request) {
        super(req)
    }
}