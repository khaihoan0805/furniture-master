import { PRODUCT_OUTPUT } from "../../../const";
import { IProductDomain } from "../../../domain";
import { constructorProvide } from "../../../infrastructure/ioc";
import { IPaginateOutput, PaginateOutput } from "../base";

export interface IPaginateProductOutput extends IPaginateOutput<IProductDomain> {

}

@constructorProvide(PRODUCT_OUTPUT.PAGINATE)
export class PaginateProductOutput extends PaginateOutput<IProductDomain> implements IPaginateProductOutput {
    constructor(output: IPaginateProductOutput) {
        super(output)
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