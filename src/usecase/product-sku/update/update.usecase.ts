import { API_DOMAIN, PRODUCT_SKU_USECASE, TYPES } from "../../../const";
import { IUpdateProductSKUInput, IUpdateProductSKUOutput } from "../../../controller";
import { IProductSKUDomain } from "../../../domain";
import { IProductSKURepository } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { IUpdateUsecase, UpdateUsecase } from "../../base";

export interface IUpdateProductSKUUsecase extends IUpdateUsecase<IProductSKUDomain, IUpdateProductSKUInput, IUpdateProductSKUOutput> {}

@singletonNamedProvide(TYPES.USECASE, PRODUCT_SKU_USECASE.UPDATE)
export class UpdateProductSKUUsecase extends UpdateUsecase<IProductSKUDomain, IUpdateProductSKUInput, IUpdateProductSKUOutput> {
    get DOMAIN() {
        return API_DOMAIN.PRODUCT_SKU;
    }

    get id() {
        return PRODUCT_SKU_USECASE.UPDATE;
    }

    constructor(
        @namedInject(TYPES.REPOSITORY, API_DOMAIN.PRODUCT_SKU)
        protected repository: IProductSKURepository
    ) {
        super(repository)
    }
}
