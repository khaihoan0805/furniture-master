import { API_DOMAIN, PRODUCT_CATEGORY_WORKFLOW, TYPES } from "../../../const";
import { ICreateProductCategoryInput, ICreateProductCategoryOutput } from "../../../controller";
import { IProductCategoryDomain } from "../../../domain";
import { ICategoryRepository, IProductCategoryRepository, IProductRepository } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { CreateWorkflow, ICreateWorkflow } from "../../base";

export interface ICreateProductCategoryWorkflow extends ICreateWorkflow<IProductCategoryDomain, ICreateProductCategoryInput, ICreateProductCategoryOutput> {}

@singletonNamedProvide(TYPES.WORKFLOW, PRODUCT_CATEGORY_WORKFLOW.CREATE)
export class CreateProductCategoryWorkflow extends CreateWorkflow<IProductCategoryDomain, ICreateProductCategoryInput, ICreateProductCategoryOutput> {
    get DOMAIN() {
        return API_DOMAIN.PRODUCT_CATEGORY;
    }

    get id() {
        return PRODUCT_CATEGORY_WORKFLOW.CREATE;
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