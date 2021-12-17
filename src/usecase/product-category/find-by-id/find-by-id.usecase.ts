import { API_DOMAIN, PRODUCT_CATEGORY_USECASE, TYPES } from "../../../const";
import { IFindProductCategoryByIdInput, IFindProductCategoryByIdOutput } from "../../../controller";
import { IProductCategoryDomain } from "../../../domain";
import { IProductCategoryRepository } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { FindByIdUsecase, IFindByIdUsecase } from "../../base";

export interface IFindProductCategoryByIdUsecase extends IFindByIdUsecase<IProductCategoryDomain, IFindProductCategoryByIdInput, IFindProductCategoryByIdOutput> {}

@singletonNamedProvide(TYPES.USECASE, PRODUCT_CATEGORY_USECASE.FIND_BY_ID)
export class FindProductCategoryByIdUsecase extends FindByIdUsecase<IProductCategoryDomain, IFindProductCategoryByIdInput, IFindProductCategoryByIdOutput> {
    get DOMAIN() {
        return API_DOMAIN.PRODUCT_CATEGORY;
    }

    get id() {
        return PRODUCT_CATEGORY_USECASE.CREATE;
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