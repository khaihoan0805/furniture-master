import { API_DOMAIN, PRODUCT_STEP, TYPES } from "../../../../const";
import { IProductCategoryDomain, IProductDomain } from "../../../../domain";
import { IProductRepository } from "../../../../infrastructure";
import { BaseStep, IStep } from "../../../../infrastructure/base";
import { namedInject, singletonNamedProvide } from "../../../../infrastructure/ioc";

export interface IFindProductDetailStep extends IStep<IProductCategoryDomain[], IProductDomain[]> { }

@singletonNamedProvide(TYPES.STEP, PRODUCT_STEP.FIND_PRODUCT_DETAILS)
export class FindProductDetailStep extends BaseStep<IProductCategoryDomain[], IProductDomain[]> implements IFindProductDetailStep {
    get id() {
        return PRODUCT_STEP.FIND_PRODUCT_DETAILS;
    }

    @namedInject(TYPES.REPOSITORY, API_DOMAIN.PRODUCT)
    protected productRepository: IProductRepository;

    async run(input: IProductCategoryDomain[]): Promise<IProductDomain[]> {
        const products = await Promise.all(input.map(async productCategory => {
            return await this.productRepository.findById(<number>productCategory.productId)
        }))

        return products;
    }
}