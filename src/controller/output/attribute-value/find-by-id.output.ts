import { ATTRIBUTE_VALUE_OUTPUT } from "../../../const";
import { IAttributeValueDomain } from "../../../domain";
import { constructorProvide } from "../../../infrastructure/ioc";
import { FindByIdOutput, IFindByIdOutput } from "../base";

export interface IFIndAttributeValuebyIdOutput extends IFindByIdOutput<IAttributeValueDomain> {}

@constructorProvide(ATTRIBUTE_VALUE_OUTPUT.FIND_BY_ID)
export class FindAttributeValueByIdOutput extends FindByIdOutput<IAttributeValueDomain> implements IFIndAttributeValuebyIdOutput {
    constructor(output: IFIndAttributeValuebyIdOutput) {
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