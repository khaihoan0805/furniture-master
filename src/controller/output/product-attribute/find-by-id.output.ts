import { PRODUCT_ATTRIBUTE_OUTPUT } from "../../../const";
import { IProductAttributeDomain } from "../../../domain";
import { constructorProvide } from "../../../infrastructure/ioc";
import { FindByIdOutput, IFindByIdOutput } from "../base";

export interface IFindProductAttributeByIdOutput extends IFindByIdOutput<IProductAttributeDomain> {}

@constructorProvide(PRODUCT_ATTRIBUTE_OUTPUT.FIND_BY_ID)
export class FindProductAttributeByIdOutput extends FindByIdOutput<IProductAttributeDomain> implements IFindProductAttributeByIdOutput {
    constructor(output: IFindProductAttributeByIdOutput) {
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