import { API_DOMAIN, PRODUCT_CATEGORY_WORKFLOW, TYPES } from "../../../const";
import { ICreateProductCategoryInput, ICreateProductCategoryOutput, IUpdateProductCategoryInput, IUpdateProductCategoryOutput } from "../../../controller";
import { IProductCategoryDomain } from "../../../domain";
import { IProductRepository, ICategoryRepository, IProductCategoryRepository } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { IUpdateWorkflow, UpdateWorkflow } from "../../base";

export interface IUpdateProductCategoryWorkflow extends IUpdateWorkflow<IProductCategoryDomain, IUpdateProductCategoryInput, IUpdateProductCategoryOutput> {}

@singletonNamedProvide(TYPES.WORKFLOW, PRODUCT_CATEGORY_WORKFLOW.UPDATE)
export class UpdateProductCategoryWorkflow extends UpdateWorkflow<IProductCategoryDomain, IUpdateProductCategoryInput, IUpdateProductCategoryOutput> {
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