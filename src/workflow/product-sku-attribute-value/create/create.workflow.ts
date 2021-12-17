import { API_DOMAIN, PRODUCT_SKU_ATTRIBUTE_VALUE_WORKFLOW, TYPES } from "../../../const";
import { ICreateProductSKUAttributeValueInput, ICreateProductSKUAttributeValueOutput } from "../../../controller";
import { IProductSKUAttributeValueDomain } from "../../../domain";
import { IAttributeValueRepository, IProductSKUAttributeValueRepository, IProductSKURepository } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { CreateWorkflow, ICreateWorkflow } from "../../base";

export interface ICreateProductSKUAttributeValueWorkflow extends ICreateWorkflow<IProductSKUAttributeValueDomain, ICreateProductSKUAttributeValueInput, ICreateProductSKUAttributeValueOutput> {}

@singletonNamedProvide(TYPES.WORKFLOW, PRODUCT_SKU_ATTRIBUTE_VALUE_WORKFLOW.CREATE)
export class CreateProductSKUAttributeValueWorkflow extends CreateWorkflow<IProductSKUAttributeValueDomain, ICreateProductSKUAttributeValueInput, ICreateProductSKUAttributeValueOutput> {
    get DOMAIN() {
        return API_DOMAIN.PRODUCT_SKU_ATTRIBUTE_VALUE;
    }

    get id() {
        return PRODUCT_SKU_ATTRIBUTE_VALUE_WORKFLOW.CREATE
    }

    @namedInject(TYPES.REPOSITORY, API_DOMAIN.PRODUCT_SKU)
    protected productSKURepository: IProductSKURepository;

    @namedInject(TYPES.REPOSITORY, API_DOMAIN.ATTRIBUTE_VALUE)
    protected attributeValueRepository: IAttributeValueRepository;

    constructor(
        @namedInject(TYPES.REPOSITORY, API_DOMAIN.PRODUCT_SKU_ATTRIBUTE_VALUE)
        protected repository: IProductSKUAttributeValueRepository
    ) {
        super(repository)
    }

    async validate(entity: IProductSKUAttributeValueDomain): Promise<void> {
        const isExistedSKU = this.productSKURepository.findById(entity.skuId)

        if(!isExistedSKU) {
            throw this.errorFactory.unauthorizedError(`This SKU ${entity.skuId} is not existed.`)
        }

        const isExistedAttributeValue = this.attributeValueRepository.findById(entity.attributeId);

        if(!isExistedAttributeValue) {
            throw this.errorFactory.unauthorizedError(`This SKU ${entity.skuId} is not existed.`)
        }
    }
}