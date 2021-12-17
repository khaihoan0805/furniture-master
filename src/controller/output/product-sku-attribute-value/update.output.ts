import { IProductSKUAttributeValueDomain } from "../../../domain";
import { IUpdateOutput, UpdateOutput } from "../base";

export interface IUpdateProductSKUAttributeValueOutput extends IUpdateOutput<IProductSKUAttributeValueDomain> {}

export class UpdateProductSKUAttributeValueOutput extends UpdateOutput<IProductSKUAttributeValueDomain> implements IUpdateProductSKUAttributeValueOutput {
    constructor(output: IUpdateProductSKUAttributeValueOutput) {
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