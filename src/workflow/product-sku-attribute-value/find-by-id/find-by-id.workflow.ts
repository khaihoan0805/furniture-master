import { API_DOMAIN, PRODUCT_SKU_ATTRIBUTE_VALUE_WORKFLOW, TYPES } from "../../../const";
import { IFindProductSKUAttributeValueByIdInput, IFindProductSKUAttributeValueByIdOutput } from "../../../controller";
import { IProductSKUAttributeValueDomain } from "../../../domain";
import { IProductSKUAttributeValueRepository } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { FindByIdWorkflow, IFindByIdWorkflow } from "../../base";

export interface IFindProductSKUAttributeValueByIdWorkflow extends IFindByIdWorkflow<IProductSKUAttributeValueDomain, IFindProductSKUAttributeValueByIdInput, IFindProductSKUAttributeValueByIdOutput> {}

@singletonNamedProvide(TYPES.WORKFLOW, PRODUCT_SKU_ATTRIBUTE_VALUE_WORKFLOW.FIND_BY_ID)
export class IFindProductSKUAttributeValueByIdWorkflow extends FindByIdWorkflow<IProductSKUAttributeValueDomain, IFindProductSKUAttributeValueByIdInput, IFindProductSKUAttributeValueByIdOutput> {
    get DOMAIN() {
        return API_DOMAIN.PRODUCT_SKU_ATTRIBUTE_VALUE;
    }

    get id() {
        return PRODUCT_SKU_ATTRIBUTE_VALUE_WORKFLOW.CREATE
    }

    constructor(
        @namedInject(TYPES.REPOSITORY, API_DOMAIN.PRODUCT_SKU_ATTRIBUTE_VALUE)
        protected repository: IProductSKUAttributeValueRepository
    ) {
        super(repository)
    }

    async execute(input: IFindProductSKUAttributeValueByIdInput): Promise<IFindProductSKUAttributeValueByIdOutput> {
        return await super.execute(input);
    }
}