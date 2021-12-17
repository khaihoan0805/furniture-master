import { TYPES, PRODUCT_SKU_USECASE, API_DOMAIN } from "../../../const";
import { IFindProductSKUByIdInput, IFindProductSKUByIdOutput } from "../../../controller";
import { IProductSKUDomain } from "../../../domain";
import { IProductSKUAttributeValueRepository, IProductSKURepository, Operators } from "../../../infrastructure";
import { singletonNamedProvide, namedInject } from "../../../infrastructure/ioc";
import { IFindByIdUsecase, FindByIdUsecase } from "../../base";


export interface IFindProductSKUByIdUsecase extends IFindByIdUsecase<IProductSKUDomain, IFindProductSKUByIdInput, IFindProductSKUByIdOutput> { }

@singletonNamedProvide(TYPES.USECASE, PRODUCT_SKU_USECASE.FIND_BY_ID)
export class FindProductSKUByIdUsecase extends FindByIdUsecase<IProductSKUDomain, IFindProductSKUByIdInput, IFindProductSKUByIdOutput> {
    get DOMAIN() {
        return API_DOMAIN.PRODUCT_SKU;
    }

    get id() {
        return PRODUCT_SKU_USECASE.FIND_BY_ID;
    }

    @namedInject(TYPES.REPOSITORY, API_DOMAIN.PRODUCT_SKU_ATTRIBUTE_VALUE)
    protected productSKUAttributeValueRepository: IProductSKUAttributeValueRepository;

    constructor(
        @namedInject(TYPES.REPOSITORY, API_DOMAIN.PRODUCT_SKU)
        protected repository: IProductSKURepository
    ) {
        super(repository)
    }

    async execute(input: IFindProductSKUByIdInput): Promise<IFindProductSKUByIdOutput> {
        const response = await super.execute(input)

        const productSKU = response.entity

        const productSKUattributeValues = await this.productSKUAttributeValueRepository.find({
            filters: [
                { code: 'skuId', operator: Operators.Equals, value: productSKU.id }
            ]
        })

        productSKU.attributeValues = productSKUattributeValues;
        response.entity = productSKU;

        return response;
    }
}