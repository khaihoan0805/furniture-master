import { API_DOMAIN, PRODUCT_SKU_ATTRIBUTE_VALUE_WORKFLOW, TYPES } from "../../../const";
import { IUpdateProductSKUAttributeValueOutput } from "../../../controller";
import { IUpdateProductSKUAttributeValueInput } from "../../../controller/input/product-sku-attribute-value/update.input";
import { IProductSKUAttributeValueDomain } from "../../../domain";
import { IAttributeValueRepository, IProductSKUAttributeValueRepository, IProductSKURepository } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { IUpdateWorkflow, UpdateWorkflow } from "../../base";

export interface IUpdateProductSKUAttributeValueWorkflow extends IUpdateWorkflow<IProductSKUAttributeValueDomain, IUpdateProductSKUAttributeValueInput, IUpdateProductSKUAttributeValueOutput> {}

@singletonNamedProvide(TYPES.WORKFLOW, PRODUCT_SKU_ATTRIBUTE_VALUE_WORKFLOW.UPDATE)
export class UpdateProdcutSKUAttributeValueWorkflow extends UpdateWorkflow<IProductSKUAttributeValueDomain, IUpdateProductSKUAttributeValueInput, IUpdateProductSKUAttributeValueOutput> {
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

    async execute(input: IUpdateProductSKUAttributeValueInput): Promise<IUpdateProductSKUAttributeValueOutput> {
        return await super.execute(input)
    }
}