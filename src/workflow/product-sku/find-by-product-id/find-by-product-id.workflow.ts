import { API_DOMAIN, PRODUCT_SKU_WORKFLOW, TYPES } from "../../../const";
import { IFindProductSKUByProductIdInput, IFIndProductSKUByProductIdOutput } from "../../../controller";
import { IEntityFactory } from "../../../domain";
import { IErrorFactory, IProductSKURepository, IProductRepository, IProductSKUAttributeValueRepository, Operators } from "../../../infrastructure";
import { BaseWorkflow, IBaseWorkflow } from "../../../infrastructure/base";
import { constructorProvide, inject, namedInject } from "../../../infrastructure/ioc";

export interface IFindProductSKUByProductIdWorkflow extends IBaseWorkflow<IFindProductSKUByProductIdInput, IFIndProductSKUByProductIdOutput> { }

@constructorProvide(PRODUCT_SKU_WORKFLOW.FIND_BY_PRODUCT_ID)
export class FindProductSKUByProductIdWorkflow extends BaseWorkflow<IFindProductSKUByProductIdInput, IFIndProductSKUByProductIdOutput> implements IFindProductSKUByProductIdWorkflow {
    get id() {
        return PRODUCT_SKU_WORKFLOW.FIND_BY_PRODUCT_ID;
    }

    @inject(TYPES.ENTITY_FACTORY)
    protected entityFactory: IEntityFactory;

    @inject(TYPES.ERROR_FACTORY)
    protected errorFactory: IErrorFactory;

    @namedInject(TYPES.REPOSITORY, API_DOMAIN.PRODUCT_SKU)
    protected productSKURepository: IProductSKURepository;

    @namedInject(TYPES.REPOSITORY, API_DOMAIN.PRODUCT_SKU_ATTRIBUTE_VALUE)
    protected productSKUAttributeValueRepository: IProductSKUAttributeValueRepository;

    @namedInject(TYPES.REPOSITORY, API_DOMAIN.PRODUCT)
    protected productRepository: IProductRepository;

    async execute(input: IFindProductSKUByProductIdInput): Promise<IFIndProductSKUByProductIdOutput> {
        const isExistedProduct = await this.productRepository.findById(<number>input.productId);
        if (!isExistedProduct) {
            throw this.errorFactory.unauthorizedError(`This productId ${input.productId} is not existed.`)
        }

        const productSKUs = await this.productSKURepository.find({
            filters: [
                { code: 'productId', operator: Operators.Equals, value: isExistedProduct.id },
                { code: 'status', operator: Operators.Equals, value: 1 }
            ]
        })

        for (let index = 0; index < productSKUs.length; index++) {
            const productSKUAttributeValues = await this.productSKUAttributeValueRepository.find({
                filters: [
                    { code: 'skuId', operator: Operators.Equals, value: productSKUs[index].id },
                    { code: 'status', operator: Operators.Equals, value: 1 }
                ]
            })

            productSKUs[index].attributeValues = productSKUAttributeValues;
        }

        return { message: `find Product SKU successfully`, entities: productSKUs}
    }
}