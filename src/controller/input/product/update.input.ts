import { Request } from "express";
import { PRODUCT_INPUT } from "../../../const";
import { IAttributeDomain, ICategoryDomain } from "../../../domain";
import { constructorProvide } from "../../../infrastructure/ioc";
import { IUpdateInput, UpdateInput } from "../base";

export interface IUpdateProductInput extends IUpdateInput {
    image?: string;
    name?: string;
    status?: number;
    slug?: string;
    description?: string;
    attributes?: (IAttributeDomain | number)[];
    categories?: (ICategoryDomain | number)[];
    updatedBy?: number;
    updatedAt?: Date

}

@constructorProvide(PRODUCT_INPUT.UPDATE)
export class UpdateProductInput extends UpdateInput<IUpdateProductInput> implements IUpdateProductInput {
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

    get slug() {
        return this.input.slug;
    }

    get description() {
        return this.input.description;
    }

    get attributes() {
        return this.input.attributes;
    }

    get categories() {
        return this.input.categories;
    }

    get updatedAt() {
        return new Date();
    }

    get updatedBy() {
        return 1;
    }
}