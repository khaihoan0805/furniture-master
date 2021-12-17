import { API_DOMAIN, PRODUCT_SKU_WORKFLOW, TYPES } from "../../../const";
import { ICreateProductSKUInput, ICreateProductSKUOutput } from "../../../controller";
import { IProductSKUDomain } from "../../../domain";
import { IProductRepository, IProductSKURepository, IUserRepository, Operators } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { CreateWorkflow, ICreateWorkflow } from "../../base";

export interface ICreateProductSKUWorkflow extends ICreateWorkflow<IProductSKUDomain, ICreateProductSKUInput, ICreateProductSKUOutput> { }

@singletonNamedProvide(TYPES.WORKFLOW, PRODUCT_SKU_WORKFLOW.CREATE)
export class CreateProductSKUWorkflow extends CreateWorkflow<IProductSKUDomain, ICreateProductSKUInput, ICreateProductSKUOutput> {
    get DOMAIN() {
        return API_DOMAIN.PRODUCT_SKU;
    }

    get id() {
        return PRODUCT_SKU_WORKFLOW.CREATE;
    }

    @namedInject(TYPES.REPOSITORY, API_DOMAIN.PRODUCT)
    protected productRepository: IProductRepository;

    constructor(
        @namedInject(TYPES.REPOSITORY, API_DOMAIN.PRODUCT_SKU)
        protected repository: IProductSKURepository
    ) {
        super(repository)
    }

    async validate(entity: IProductSKUDomain): Promise<void> {
        const isExistedProduct = await this.productRepository.findById(<number>entity.productId)

        if (!isExistedProduct) {
            throw this.errorFactory.unauthorizedError(`This productId ${entity.productId} is not existed.`)
        }

        const isExistedCode = await this.repository.find({
            filters: [
                { code: 'code', operator: Operators.Equals, value: entity.productId }
            ]
        })

        if (!isExistedCode) {
            throw this.errorFactory.unauthorizedError(`This sku ${entity.productId} is not existed.`)
        }

        const isExsitedProductSKU = await this.repository.find({
            filters: [
                { code: 'code', operator: Operators.Equals, value: entity.code },
                { code: 'productId', operator: Operators.Equals, value: entity.productId }
            ]
        })

        if(isExsitedProductSKU) {
            throw this.errorFactory.unauthorizedError(`This ProductId ${entity.productId} is already have this code ${entity.code}`)
        }
    }
}