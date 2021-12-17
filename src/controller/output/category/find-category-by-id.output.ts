import { CATEGORY_OUTPUT } from "../../../const";
import { CategoryDomain, ICategoryDomain } from "../../../domain";
import { constructorProvide } from "../../../infrastructure/ioc";
import { FindByIdOutput, IFindByIdOutput } from "../base";

export interface IFindCategoryByIdOutput extends IFindByIdOutput<ICategoryDomain> {
}

@constructorProvide(CATEGORY_OUTPUT.FIND_BY_ID)
export class FindCategoryByIdOutput extends FindByIdOutput<ICategoryDomain> implements IFindCategoryByIdOutput {
    constructor(output: IFindCategoryByIdOutput) {
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