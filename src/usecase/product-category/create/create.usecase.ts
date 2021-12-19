import { API_DOMAIN, PRODUCT_CATEGORY_USECASE, TYPES } from "../../../const";
import { ICreateProductCategoryInput, ICreateProductCategoryOutput } from "../../../controller";
import { IProductCategoryDomain } from "../../../domain";
import { ICategoryRepository, IProductCategoryRepository, IProductRepository } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { CreateUsecase, ICreateUsecase } from "../../base";

export interface ICreateProductCategoryUsecase extends ICreateUsecase<IProductCategoryDomain, ICreateProductCategoryInput, ICreateProductCategoryOutput> {}

@singletonNamedProvide(TYPES.USECASE, PRODUCT_CATEGORY_USECASE.CREATE)
export class CreateProductCategoryUsecase extends CreateUsecase<IProductCategoryDomain, ICreateProductCategoryInput, ICreateProductCategoryOutput> {
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

    async validate(entity: IProductCategoryDomain): Promise<void> {
        const isExistedProduct = await this.productRepository.findById(<number>entity.productId)

        if(!isExistedProduct) {
            throw this.errorFactory.unauthorizedError(`This product ID ${entity.productId} is not existed.`)
        }

        const isExistedCategory = await this.categoryRepository.findById(<number>entity.categoryId)

        if(!isExistedCategory) {
            throw this.errorFactory.unauthorizedError(`This category ID ${entity.categoryId} is not existed`)
        }
    }

    async execute(input: ICreateProductCategoryInput): Promise<ICreateProductCategoryOutput> {
        return await super.execute(input)
    }
}