import { ATTRIBUTE_VALUE_OUTPUT } from "../../../const";
import { IAttributeValueDomain } from "../../../domain";
import { constructorProvide } from "../../../infrastructure/ioc";
import { IUpdateOutput, UpdateOutput } from "../base";

export interface IUpdateAttributeValueOutput extends IUpdateOutput<IAttributeValueDomain> {}

@constructorProvide(ATTRIBUTE_VALUE_OUTPUT.UPDATE)
export class UpdateAttributeValueOutput extends UpdateOutput<IAttributeValueDomain> implements IUpdateAttributeValueOutput {
    constructor(output: IUpdateAttributeValueOutput) {
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