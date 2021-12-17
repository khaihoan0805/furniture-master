import { Request } from "express";
import { ELEMENTS_IN_PAGE, PRODUCT_INPUT } from "../../../const";
import { constructorProvide } from "../../../infrastructure/ioc";
import { IPaginateInput, PaginateInput } from "../base";

export interface IPaginateProductInput extends IPaginateInput {
    pages?: number | string;
}



@constructorProvide(PRODUCT_INPUT.PAGINATE)
export class PaginateProductInput extends PaginateInput<IPaginateProductInput> implements IPaginateProductInput {
    constructor(req: Request) {
        super(req)
    }

    get limit() {
        if(!this.pages) return super.limit;
        return ELEMENTS_IN_PAGE.PRODUCT;
    }

    get offset() {
        if(!this.pages) return super.offset;
        return (<number>this.pages * ELEMENTS_IN_PAGE.PRODUCT) - ELEMENTS_IN_PAGE.PRODUCT; 
    }

    get pages() {
        return this.input.pages;
    }
}