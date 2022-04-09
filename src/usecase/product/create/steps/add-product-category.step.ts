import { API_DOMAIN, PRODUCT_STEP, TYPES } from "../../../../const";
import { ICreateProductInput } from "../../../../controller";
import { ICategoryDomain, IProductCategoryDomain, IProductDomain } from "../../../../domain";
import { ICategoryRepository, IProductCategoryRepository } from "../../../../infrastructure";
import { BaseStep, IStep } from "../../../../infrastructure/base";
import { namedInject, singletonNamedProvide } from "../../../../infrastructure/ioc";

export interface IAddProductCategoryStep extends IStep<IProductDomain, ICategoryDomain[]> { }

@singletonNamedProvide(TYPES.STEP, PRODUCT_STEP.ADD_PRODUCT_CATEGORY)
export class AddProductCategory extends BaseStep<IProductDomain, ICategoryDomain[]> implements IAddProductCategoryStep {
    get id() {
        return PRODUCT_STEP.ADD_PRODUCT_CATEGORY;
    }

    @namedInject(TYPES.REPOSITORY, API_DOMAIN.CATEGORY)
    protected categoryRepository: ICategoryRepository;

    @namedInject(TYPES.REPOSITORY, API_DOMAIN.PRODUCT_CATEGORY)
    protected productCategoryRepository: IProductCategoryRepository;

    async run(input: IProductDomain): Promise<ICategoryDomain[]> {
        const categories = await Promise.all(input.categories.map(async category => {
            const isExisted = await this.categoryRepository.findById(<number>category)

            if (!isExisted) {
                throw this.errorFactory.unauthorizedError(`This category ${category} is not existed.`)
            }

            return isExisted;
        }))

        for (let index = 0; index < categories.length; index++) {
            const entity = <IProductCategoryDomain>this.entityFactory.create(API_DOMAIN.PRODUCT_CATEGORY.toString(), {
                productId: input.id,
                categoryId: categories[index].id,
                status: 1
            })

            await this.productCategoryRepository.create(entity)
        }

        return categories;
    }
}