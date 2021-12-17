import { API_DOMAIN, PRODUCT_ATTRIBUTE_USECASE, TYPES } from "../../../const";
import { IFIndAttributeValuebyIdOutput, IFindProductAttributeByIdInput, IFindProductAttributeByIdOutput } from "../../../controller";
import { IProductAttributeDomain } from "../../../domain";
import { IProductAttributeRepository } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { FindByIdUsecase, IFindByIdUsecase } from "../../base";

export interface IFindProductAttributeByIdUsecase extends IFindByIdUsecase<IProductAttributeDomain, IFindProductAttributeByIdInput, IFindProductAttributeByIdOutput> {}

@singletonNamedProvide(TYPES.USECASE, PRODUCT_ATTRIBUTE_USECASE.FIND_BY_ID)
export class FindProductAttributeByIdUsecase extends FindByIdUsecase<IProductAttributeDomain, IFindProductAttributeByIdInput, IFindProductAttributeByIdOutput> {
    get DOMAIN() {
        return API_DOMAIN.PRODUCT_ATTRIBUTE;
    }

    get id() {
        return PRODUCT_ATTRIBUTE_USECASE.CREATE;
    }

    constructor(
        @namedInject(TYPES.REPOSITORY, API_DOMAIN.PRODUCT_ATTRIBUTE)
        protected repository: IProductAttributeRepository
    ) {
        super(repository)
    }

    async execute(input: IFindProductAttributeByIdInput): Promise<IFindProductAttributeByIdOutput> {
        return super.execute(input)
    }
}