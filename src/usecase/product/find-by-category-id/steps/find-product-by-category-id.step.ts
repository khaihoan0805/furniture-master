import { API_DOMAIN, PRODUCT_STEP, TYPES } from "../../../../const";
import { ICategoryDomain, IProductCategoryDomain } from "../../../../domain";
import { IProductCategoryRepository, Operators } from "../../../../infrastructure";
import { BaseStep, IStep } from "../../../../infrastructure/base";
import { namedInject, singletonNamedProvide } from "../../../../infrastructure/ioc";

export interface IFindProductByCateogryIdStep extends IStep<ICategoryDomain, IProductCategoryDomain[]> { }

@singletonNamedProvide(TYPES.STEP, PRODUCT_STEP.FIND_BY_CATEGORY_ID)
export class FindProductByCategoryIdStep extends BaseStep<ICategoryDomain, IProductCategoryDomain[]> implements IFindProductByCateogryIdStep {
    get id() {
        return PRODUCT_STEP.FIND_BY_CATEGORY_ID;
    }

    @namedInject(TYPES.REPOSITORY, API_DOMAIN.PRODUCT_CATEGORY)
    protected productCategoryRepository: IProductCategoryRepository;

    async run(input: ICategoryDomain): Promise<IProductCategoryDomain[]> {
        const productsCategory = await this.productCategoryRepository.find({
            filters: [
                { code: 'categoryId', operator: Operators.Equals, value: input.id }
            ]
        })

        return productsCategory;
    }
}