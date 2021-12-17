import { ATTRIBUTE_VALUE_OUTPUT } from "../../../const";
import { IAttributeValueDomain } from "../../../domain";
import { constructorProvide } from "../../../infrastructure/ioc";
import { CreateOutput, ICreateOutput } from "../base";

export interface ICreateAttributeValueOutput extends ICreateOutput<IAttributeValueDomain> {}

@constructorProvide(ATTRIBUTE_VALUE_OUTPUT.CREATE)
export class CreateAttributeValueOutput extends CreateOutput<IAttributeValueDomain> implements ICreateAttributeValueOutput {
    constructor(output: ICreateAttributeValueOutput) {
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