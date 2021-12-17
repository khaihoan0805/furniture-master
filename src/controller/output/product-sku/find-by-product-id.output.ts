import { PRODUCT_SKU_OUTPUT } from "../../../const";
import { IProductSKUDomain } from "../../../domain";
import { BaseHttpOutput, IBaseHttpOutput } from "../../../infrastructure/base";
import { constructorProvide } from "../../../infrastructure/ioc";

export interface IFIndProductSKUByProductIdOutput extends IBaseHttpOutput {
    message: string;
    entities: IProductSKUDomain[];
}

@constructorProvide(PRODUCT_SKU_OUTPUT.FIND_BY_PRODUCT_ID)
export class FindProductSKUByProductIdOutput extends BaseHttpOutput<IFIndProductSKUByProductIdOutput> implements IFIndProductSKUByProductIdOutput {
    constructor(output: IFIndProductSKUByProductIdOutput) {
        super(output)
    }

    get message() {
        return this.output.message;
    }

    get entities() {
        return this.output.entities;
    }

    get response() {
        const {
            message,
            entities
        } = this;

        return {
            message,
            entities
        }
    }
}