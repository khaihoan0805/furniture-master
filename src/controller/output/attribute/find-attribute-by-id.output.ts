import { ATTRIBUTE_OUTPUT } from "../../../const";
import { AttributeDomain, IAttributeDomain } from "../../../domain";
import { constructorProvide } from "../../../infrastructure/ioc";
import { FindByIdOutput, IFindByIdOutput } from "../base";

export interface IFindAttributeByIdOutput extends IFindByIdOutput<IAttributeDomain> {}

@constructorProvide(ATTRIBUTE_OUTPUT.FIND_BY_ID)
export class FindAttributeByIdOutput extends FindByIdOutput<IAttributeDomain> implements IFindAttributeByIdOutput {
    constructor(output: IFindAttributeByIdOutput) {
        super(output)
    }

    get response() {
        const {
            entity,
            message
        } = this;

        return {
            entity,
            message
        }
    }
}