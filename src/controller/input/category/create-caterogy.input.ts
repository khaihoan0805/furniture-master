import { Request } from "express";
import { CATEGORY_INPUT } from "../../../const";
import { CategoryDomain, ICategory } from "../../../domain";
import { constructorProvide } from "../../../infrastructure/ioc";
import { CreateInput, ICreateInput } from "../base";

export interface ICreateCategoryInput extends ICreateInput, ICategory {}

@constructorProvide(CATEGORY_INPUT.CREATE)
export class CreateCategoryInput extends CreateInput<CategoryDomain> implements ICreateCategoryInput {
    constructor(req: Request) {
        super(req)
    }

    get image() {
        return this.input.image;
    }
    
    get name() {
        return this.input.name;
    }

    get status() {
        return this.input.status;
    }

    get description() {
        return this.input.description;
    }

    get createdAt() {
        return new Date();
    }

    get createdBy() {
        return 1;
    }

    get updatedAt() {
        return new Date();
    }

    get updatedBy() {
        return 1;
    }   
}