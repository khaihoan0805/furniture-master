import { API_DOMAIN, PRODUCT_WORKFLOW, TYPES } from "../../../const";
import { IFindProductByCategoryIdInput, IFindProductByCategoryIdOutput } from "../../../controller";
import { IEntityFactory } from "../../../domain";
import { ICategoryRepository, IErrorFactory, IProductCategoryRepository, IProductRepository, Operators } from "../../../infrastructure";
import { BaseWorkflow, IBaseWorkflow } from "../../../infrastructure/base";
import { inject, namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";

export interface IFindProductByCategoryIdWorkflow extends IBaseWorkflow<IFindProductByCategoryIdInput, IFindProductByCategoryIdOutput> { }

@singletonNamedProvide(TYPES.WORKFLOW, PRODUCT_WORKFLOW.FIND_BY_CATEGORY_ID)
export class FindProductByCategoryIdWorkflow extends BaseWorkflow<IFindProductByCategoryIdInput, IFindProductByCategoryIdOutput> implements IBaseWorkflow<IFindProductByCategoryIdInput, IFindProductByCategoryIdOutput> {
    get id() {
        return PRODUCT_WORKFLOW.FIND_BY_CATEGORY_ID;
    }

    @inject(TYPES.ENTITY_FACTORY)
    protected entityFactory: IEntityFactory;

    @inject(TYPES.ERROR_FACTORY)
    protected errorFactory: IErrorFactory;

    @namedInject(TYPES.REPOSITORY, API_DOMAIN.PRODUCT)
    protected productRepository: IProductRepository;

    @namedInject(TYPES.REPOSITORY, API_DOMAIN.PRODUCT_CATEGORY)
    protected productCategoryRepository: IProductCategoryRepository;

    @namedInject(TYPES.REPOSITORY, API_DOMAIN.CATEGORY)
    protected categoryRepository: ICategoryRepository;

    async execute(input: IFindProductByCategoryIdInput): Promise<IFindProductByCategoryIdOutput> {
        const isExistedCategory = await this.categoryRepository.findById(<number>input.categoryId)
        this.log.info(isExistedCategory)
        if (!isExistedCategory) {
            throw this.errorFactory.unauthorizedError(`This category ${input.categoryId} is not existed.`)
        }

        const productsCategory = await this.productCategoryRepository.find({
            filters: [
                { code: 'categoryId', operator: Operators.Equals, value: isExistedCategory.id }
            ]
        })

        this.log.info(productsCategory)

        const products = await Promise.all(productsCategory.map(async productCategory => {
            return await this.productRepository.findById(<number>productCategory.productId)
        }))

        return {
            message: `find by category id successfully`,
            entities: products
        }
    }
}