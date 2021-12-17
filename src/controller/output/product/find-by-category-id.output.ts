import { PRODUCT_OUTPUT } from "../../../const";
import { IProductDomain } from "../../../domain";
import { BaseHttpOutput, IBaseHttpOutput } from "../../../infrastructure/base";
import { constructorProvide } from "../../../infrastructure/ioc";

export interface IFindProductByCategoryIdOutput extends IBaseHttpOutput {
    message: string;
    entities: IProductDomain[];
}

@constructorProvide(PRODUCT_OUTPUT.FIND_BY_CATEGORY_ID)
export class FindProductByCategoryIdOutput extends BaseHttpOutput<IFindProductByCategoryIdOutput> implements IFindProductByCategoryIdOutput {
    constructor(output: IFindProductByCategoryIdOutput) {
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