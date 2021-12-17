import { CATEGORY_OUTPUT } from "../../../const";
import { CategoryDomain, ICategoryDomain } from "../../../domain";
import { constructorProvide } from "../../../infrastructure/ioc";
import { CreateOutput, ICreateOutput } from "../base";

export interface ICreateCategoryOutput extends ICreateOutput<ICategoryDomain> {
}

@constructorProvide(CATEGORY_OUTPUT.CREATE)
export class CreateCategoryOutput extends CreateOutput<ICategoryDomain> implements ICreateCategoryOutput {
    constructor(output: ICreateCategoryOutput) {
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