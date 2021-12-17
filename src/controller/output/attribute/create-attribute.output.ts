import { ATTRIBUTE_OUTPUT } from "../../../const";
import { AttributeDomain, IAttributeDomain } from "../../../domain";
import { constructorProvide } from "../../../infrastructure/ioc";
import { CreateOutput, ICreateOutput } from "../base";

export interface ICreateAttributeOutput extends ICreateOutput<IAttributeDomain> {
}

@constructorProvide(ATTRIBUTE_OUTPUT.CREATE)
export class CreateAttributeOutput extends CreateOutput<IAttributeDomain> implements ICreateAttributeOutput {
    constructor(output: ICreateAttributeOutput) {
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