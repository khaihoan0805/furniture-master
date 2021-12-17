import { TYPES, PRODUCT_SKU_WORKFLOW, API_DOMAIN } from "../../../const";
import { IFindProductSKUByIdInput, IFindProductSKUByIdOutput } from "../../../controller";
import { IProductSKUDomain } from "../../../domain";
import { IProductSKUAttributeValueRepository, IProductSKURepository, Operators } from "../../../infrastructure";
import { singletonNamedProvide, namedInject } from "../../../infrastructure/ioc";
import { IFindByIdWorkflow, FindByIdWorkflow } from "../../base";


export interface IFindProductSKUByIdWorkflow extends IFindByIdWorkflow<IProductSKUDomain, IFindProductSKUByIdInput, IFindProductSKUByIdOutput> { }

@singletonNamedProvide(TYPES.WORKFLOW, PRODUCT_SKU_WORKFLOW.FIND_BY_ID)
export class FindProductSKUByIdWorkflow extends FindByIdWorkflow<IProductSKUDomain, IFindProductSKUByIdInput, IFindProductSKUByIdOutput> {
    get DOMAIN() {
        return API_DOMAIN.PRODUCT_SKU;
    }

    get id() {
        return PRODUCT_SKU_WORKFLOW.FIND_BY_ID;
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