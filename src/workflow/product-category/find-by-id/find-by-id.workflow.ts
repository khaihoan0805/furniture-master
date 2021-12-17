import { API_DOMAIN, PRODUCT_CATEGORY_WORKFLOW, TYPES } from "../../../const";
import { IFindProductCategoryByIdInput, IFindProductCategoryByIdOutput } from "../../../controller";
import { IProductCategoryDomain } from "../../../domain";
import { IProductCategoryRepository } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { FindByIdWorkflow, IFindByIdWorkflow } from "../../base";

export interface IFindProductCategoryByIdWorkflow extends IFindByIdWorkflow<IProductCategoryDomain, IFindProductCategoryByIdInput, IFindProductCategoryByIdOutput> {}

@singletonNamedProvide(TYPES.WORKFLOW, PRODUCT_CATEGORY_WORKFLOW.FIND_BY_ID)
export class FindProductCategoryByIdWorkflow extends FindByIdWorkflow<IProductCategoryDomain, IFindProductCategoryByIdInput, IFindProductCategoryByIdOutput> {
    get DOMAIN() {
        return API_DOMAIN.PRODUCT_CATEGORY;
    }

    get id() {
        return PRODUCT_CATEGORY_WORKFLOW.CREATE;
    }
    
    constructor(
        @namedInject(TYPES.REPOSITORY, API_DOMAIN.PRODUCT_CATEGORY)
        protected repository: IProductCategoryRepository
    ) {
        super(repository)
    }

    async execute(input: IFindProductCategoryByIdInput): Promise<IFindProductCategoryByIdOutput> {
        return await super.execute(input)
    }
}