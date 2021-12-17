import { API_DOMAIN, PRODUCT_WORKFLOW, TYPES, USER_WORKFLOW } from "../../../const";
import { ICreateProductInput, ICreateProductOutput } from "../../../controller";
import { IProductAttributeDomain, IProductCategoryDomain, IProductDomain } from "../../../domain";
import { IAttributeRepository, ICategoryRepository, IProductAttributeRepository, IProductCategoryRepository, IProductRepository, Operators } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { CreateWorkflow, ICreateWorkflow } from "../../base";

export interface ICreateProductWorkflow extends ICreateWorkflow<IProductDomain, ICreateProductInput, ICreateProductOutput> { }

@singletonNamedProvide(TYPES.WORKFLOW, PRODUCT_WORKFLOW.CREATE)
export class CreateProductWorkflow extends CreateWorkflow<IProductDomain, ICreateProductInput, ICreateProductOutput> {
    get DOMAIN() {
        return API_DOMAIN.PRODUCT;
    }

    get id() {
        return USER_WORKFLOW.CREATE
    }

    @namedInject(TYPES.REPOSITORY, API_DOMAIN.ATTRIBUTE)
    protected attributeRepository: IAttributeRepository

    @namedInject(TYPES.REPOSITORY, API_DOMAIN.PRODUCT_ATTRIBUTE)
    protected productAttributeRepository: IProductAttributeRepository

    @namedInject(TYPES.REPOSITORY, API_DOMAIN.CATEGORY)
    protected categoryRepository: ICategoryRepository

    @namedInject(TYPES.REPOSITORY, API_DOMAIN.PRODUCT_CATEGORY)
    protected productCategoryRepository: IProductCategoryRepository

    constructor(
        @namedInject(TYPES.REPOSITORY, API_DOMAIN.PRODUCT)
        protected repository: IProductRepository
    ) {
        super(repository)
    }

    async validate(entity: IProductDomain): Promise<void> {
        const isExistedProduct = await this.repository.find({
            filters: [
                { code: 'name', operator: Operators.Equals, value: [entity.name] }
            ]
        })

        if (isExistedProduct.length > 0) {
            throw this.errorFactory.unauthorizedError(`This Product name: ${entity.name} is alread existed.`)
        }
    }

    async execute(input: ICreateProductInput): Promise<ICreateProductOutput> {
        const product = await super.execute(input)

        const categories = await Promise.all(input.categories.map(async category => {
            const isExisted = await this.categoryRepository.findById(<number>category)

            if (!isExisted) {
                throw this.errorFactory.unauthorizedError(`This category ${category} is not existed.`)
            }

            return isExisted;
        }))

        for(let index = 0; index < categories.length; index++) {
            const entity = <IProductCategoryDomain>this.entityFactory.create(API_DOMAIN.PRODUCT_CATEGORY.toString(), {
                productId: product.entity.id,
                categoryId: categories[index].id,
                status: 1
            })

            await this.productCategoryRepository.create(entity)   
        }

        product.entity.categories = categories;

        const attributes = await Promise.all(input.attributes.map(async attribute => {
            const isExisted = await this.attributeRepository.findById(<number>attribute)

            if (!isExisted) {
                throw this.errorFactory.unauthorizedError(`This attributeID ${attribute} is not existed.`)
            }

            return isExisted;
        }))

        for (let index = 0; index < attributes.length; index++) {
            const entity = <IProductAttributeDomain>this.entityFactory.create(API_DOMAIN.PRODUCT_ATTRIBUTE.toString(), {
                productId: product.entity.id,
                attributeId: attributes[index].id,
                status: 1
            })

            await this.productAttributeRepository.create(entity)
        }

        product.entity.attributes = attributes;

        return product;
    }
}