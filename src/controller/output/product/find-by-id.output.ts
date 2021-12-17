import { PRODUCT_OUTPUT } from "../../../const";
import { IProductDomain } from "../../../domain";
import { constructorProvide } from "../../../infrastructure/ioc";
import { FindByIdOutput, IFindByIdOutput } from "../base";

export interface IFindProductByIdOutput extends IFindByIdOutput<IProductDomain> {}

@constructorProvide(PRODUCT_OUTPUT.FIND_BY_ID)
export class FindProductByIdOutput extends FindByIdOutput<IProductDomain> implements IFindProductByIdOutput {
    constructor(output: IFindProductByIdOutput) {
        super(output)
    }

    get response() {
        const {
            message,
            entity
        } = this;

        return {
            message,
            entity
        }
    }
}