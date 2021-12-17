import { API_DOMAIN, PRODUCT_ATTRIBUTE_USECASE, TYPES } from "../../../const";
import { ICreateProductAttributeInput, ICreateProductAttributeOutput } from "../../../controller";
import { IProductAttributeDomain } from "../../../domain";
import { IAttributeRepository, IProductAttributeRepository, IProductRepository, Operators } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { CreateUsecase, ICreateUsecase } from "../../base";

export interface ICreateProductAttributeUsecase extends ICreateUsecase<IProductAttributeDomain, ICreateProductAttributeInput, ICreateProductAttributeOutput> { }

@singletonNamedProvide(TYPES.USECASE, PRODUCT_ATTRIBUTE_USECASE.CREATE)
export class CreateProductAttributeUsecase extends CreateUsecase<IProductAttributeDomain, ICreateProductAttributeInput, ICreateProductAttributeOutput> {
    get DOMAIN() {
        return API_DOMAIN.PRODUCT_ATTRIBUTE;
    }

    get id() {
        return PRODUCT_ATTRIBUTE_USECASE.CREATE;
    }

    @namedInject(TYPES.REPOSITORY, API_DOMAIN.ATTRIBUTE)
    protected attributeRepository: IAttributeRepository;

    @namedInject(TYPES.REPOSITORY, API_DOMAIN.ATTRIBUTE)
    protected productRepository: IProductRepository;

    constructor(
        @namedInject(TYPES.REPOSITORY, API_DOMAIN.PRODUCT_ATTRIBUTE)
        protected repository: IProductAttributeRepository
    ) {
        super(repository)
    }

    async validate(entity: IProductAttributeDomain): Promise<void> {
        const isExistedProduct = await this.productRepository.findById(<number>entity.productId)

        if (!isExistedProduct) {
            throw this.errorFactory.unauthorizedError(`This product ID ${entity.productId} is not existed.`)
        }

        const isExistedAttribute = await this.attributeRepository.findById(<number>entity.attributeId)

        if (!isExistedAttribute) {
            throw this.errorFactory.unauthorizedError(`This attribute ID ${entity.attributeId} is not existed.`)
        }

        const isExistedProductAttribute = await this.repository.find({
            filters: [
                { code: 'productId', operator: Operators.Equals, value: <number>entity.productId },
                { code: 'attributeId', operator: Operators.Equals, value: <number>entity.attributeId }
            ]
        })

        if(isExistedProductAttribute) {
            throw this.errorFactory.unauthorizedError(`This Product-attribute ${isExistedProductAttribute.toString()} is already existed`)
        }
    }

    async execute(input: ICreateProductAttributeInput): Promise<ICreateProductAttributeOutput> {
        return super.execute(input)
    }
}