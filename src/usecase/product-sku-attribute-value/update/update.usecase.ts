import { API_DOMAIN, PRODUCT_SKU_ATTRIBUTE_VALUE_USECASE, TYPES } from "../../../const";
import { IUpdateProductSKUAttributeValueOutput } from "../../../controller";
import { IUpdateProductSKUAttributeValueInput } from "../../../controller/input/product-sku-attribute-value/update.input";
import { IProductSKUAttributeValueDomain } from "../../../domain";
import { IAttributeValueRepository, IProductSKUAttributeValueRepository, IProductSKURepository } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { IUpdateUsecase, UpdateUsecase } from "../../base";

export interface IUpdateProductSKUAttributeValueUsecase extends IUpdateUsecase<IProductSKUAttributeValueDomain, IUpdateProductSKUAttributeValueInput, IUpdateProductSKUAttributeValueOutput> {}

@singletonNamedProvide(TYPES.USECASE, PRODUCT_SKU_ATTRIBUTE_VALUE_USECASE.UPDATE)
export class UpdateProdcutSKUAttributeValueUsecase extends UpdateUsecase<IProductSKUAttributeValueDomain, IUpdateProductSKUAttributeValueInput, IUpdateProductSKUAttributeValueOutput> {
    get DOMAIN() {
        return API_DOMAIN.PRODUCT_SKU_ATTRIBUTE_VALUE;
    }

    get id() {
        return PRODUCT_SKU_ATTRIBUTE_VALUE_USECASE.CREATE
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