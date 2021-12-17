import { API_DOMAIN, PRODUCT_SKU_ATTRIBUTE_VALUE_USECASE, TYPES } from "../../../const";
import { IFindProductSKUAttributeValueByIdInput, IFindProductSKUAttributeValueByIdOutput } from "../../../controller";
import { IProductSKUAttributeValueDomain } from "../../../domain";
import { IProductSKUAttributeValueRepository } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { FindByIdUsecase, IFindByIdUsecase } from "../../base";

export interface IFindProductSKUAttributeValueByIdUsecase extends IFindByIdUsecase<IProductSKUAttributeValueDomain, IFindProductSKUAttributeValueByIdInput, IFindProductSKUAttributeValueByIdOutput> {}

@singletonNamedProvide(TYPES.USECASE, PRODUCT_SKU_ATTRIBUTE_VALUE_USECASE.FIND_BY_ID)
export class IFindProductSKUAttributeValueByIdUsecase extends FindByIdUsecase<IProductSKUAttributeValueDomain, IFindProductSKUAttributeValueByIdInput, IFindProductSKUAttributeValueByIdOutput> {
    get DOMAIN() {
        return API_DOMAIN.PRODUCT_SKU_ATTRIBUTE_VALUE;
    }

    get id() {
        return PRODUCT_SKU_ATTRIBUTE_VALUE_USECASE.CREATE
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