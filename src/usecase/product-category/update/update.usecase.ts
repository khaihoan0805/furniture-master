import { API_DOMAIN, PRODUCT_CATEGORY_USECASE, TYPES } from "../../../const";
import { IUpdateProductCategoryInput, IUpdateProductCategoryOutput } from "../../../controller";
import { IProductCategoryDomain } from "../../../domain";
import { IProductRepository, ICategoryRepository, IProductCategoryRepository } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { IUpdateUsecase, UpdateUsecase } from "../../base";

export interface IUpdateProductCategoryUsecase extends IUpdateUsecase<IProductCategoryDomain, IUpdateProductCategoryInput, IUpdateProductCategoryOutput> {}

@singletonNamedProvide(TYPES.USECASE, PRODUCT_CATEGORY_USECASE.UPDATE)
export class UpdateProductCategoryUsecase extends UpdateUsecase<IProductCategoryDomain, IUpdateProductCategoryInput, IUpdateProductCategoryOutput> {
    get DOMAIN() {
        return API_DOMAIN.PRODUCT_CATEGORY;
    }

    get id() {
        return PRODUCT_CATEGORY_USECASE.CREATE;
    }
    
    @namedInject(TYPES.REPOSITORY, API_DOMAIN.PRODUCT)
    protected productRepository: IProductRepository
    
    @namedInject(TYPES.REPOSITORY, API_DOMAIN.CATEGORY)
    protected categoryRepository: ICategoryRepository

    constructor(
        @namedInject(TYPES.REPOSITORY, API_DOMAIN.PRODUCT_CATEGORY)
        protected repository: IProductCategoryRepository
    ) {
        super(repository)
    }

    async execute(input: IUpdateProductCategoryInput): Promise<IUpdateProductCategoryOutput> {
        const isExistedProduct = await this.productRepository.findById(<number>input.productId)

        if(!isExistedProduct) {
            throw this.errorFactory.unauthorizedError(`This product ID ${input.productId} is not existed.`)
        }

        const isExistedCategory = await this.categoryRepository.findById(<number>input.categoryId)

        if(!isExistedCategory) {
            throw this.errorFactory.unauthorizedError(`This category ID ${input.categoryId} is not existed`)
        }

        return await super.execute(input)
    }
}