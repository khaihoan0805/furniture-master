import { API_DOMAIN, CATEGORY_OUTPUT, CATEGORY_USECASE, TYPES } from "../../../const";
import { IFindCategoryByIdInput, IFindCategoryByIdOutput } from "../../../controller";
import { CategoryDomain, ICategoryDomain } from "../../../domain";
import { ICategoryRepository } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { FindByIdUsecase, IFindByIdUsecase } from "../../base";

export interface IFindCategoryByIdUsecase extends IFindByIdUsecase<ICategoryDomain, IFindCategoryByIdInput, IFindCategoryByIdOutput> { }

@singletonNamedProvide(TYPES.USECASE, CATEGORY_USECASE.FIND_BY_ID)
export class FindCategoryByIdUsecase extends FindByIdUsecase<ICategoryDomain, IFindCategoryByIdInput, IFindCategoryByIdOutput> {
    get DOMAIN() {
        return API_DOMAIN.CATEGORY;
    }

    get id() {
        return CATEGORY_USECASE.FIND_BY_ID;
    }

    constructor(
        @namedInject(TYPES.REPOSITORY, API_DOMAIN.CATEGORY)
        repository: ICategoryRepository
    ) {
        super(repository)
    } 
}