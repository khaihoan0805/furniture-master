import { API_DOMAIN, PRODUCT_ATTRIBUTE_USECASE, TYPES } from "../../../const";
import { IFindProductAttributeByIdInput, IFindProductAttributeByIdOutput } from "../../../controller";
import { IProductAttributeDomain } from "../../../domain";
import { IProductAttributeRepository } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { IUpdateUsecase, UpdateUsecase } from "../../base";

export interface IUpdateProductAttributeUsecase extends IUpdateUsecase<IProductAttributeDomain, IFindProductAttributeByIdInput, IFindProductAttributeByIdOutput> {}

@singletonNamedProvide(TYPES.USECASE, PRODUCT_ATTRIBUTE_USECASE.UPDATE)
export class UpdateProductAttributeUsecase extends UpdateUsecase<IProductAttributeDomain, IFindProductAttributeByIdInput, IFindProductAttributeByIdOutput> {
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
        return await super.execute(input)
    }
}