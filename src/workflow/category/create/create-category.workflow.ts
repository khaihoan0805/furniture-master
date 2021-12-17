import { API_DOMAIN, CATEGORY_OUTPUT, CATEGORY_WORKFLOW, TYPES } from "../../../const";
import { ICreateCategoryInput, ICreateCategoryOutput } from "../../../controller";
import { CategoryDomain, ICategoryDomain } from "../../../domain";
import { ICategoryRepository, Operators } from "../../../infrastructure";
import { constructorProvide, namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { CreateWorkflow, ICreateWorkflow } from "../../base";

export interface ICreateCaterogyWorkflow extends ICreateWorkflow<ICategoryDomain, ICreateCategoryInput, ICreateCategoryOutput> {

}

@singletonNamedProvide(TYPES.WORKFLOW, CATEGORY_WORKFLOW.CREATE)
export class CreateCategoryWorkflow extends CreateWorkflow<ICategoryDomain, ICreateCategoryInput, ICreateCategoryOutput> {
    get DOMAIN() {
        return API_DOMAIN.CATEGORY;
    }

    get id() {
        return CATEGORY_WORKFLOW.CREATE;
    }

    constructor(
        @namedInject(TYPES.REPOSITORY, API_DOMAIN.CATEGORY)
        repository: ICategoryRepository
    ) {
        super(repository)
    }

    async validate(entity: ICategoryDomain): Promise<void> {
        const isExisted = await this.repository.find({
            filters: [
                { code: 'name', operator: Operators.Equals, value: entity.name }
            ]
        })

        if (isExisted.length > 0) {
            throw this.errorFactory.unauthorizedError(`This category name: ${entity.name} is already exsited.`)
        }
    }
}