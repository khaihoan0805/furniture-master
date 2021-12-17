import { API_DOMAIN, PRODUCT_USECASE, TYPES, USER_USECASE } from "../../../const";
import { IUpdateProductInput } from "../../../controller/input/product/update.input";
import { IUpdateProductOutput } from "../../../controller/output/product/update.input";
import { IProductDomain } from "../../../domain";
import { IProductRepository } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { IUpdateUsecase, UpdateUsecase } from "../../base";

export interface IUpdateProductUsecase extends IUpdateUsecase<IProductDomain, IUpdateProductInput, IUpdateProductOutput> {}

@singletonNamedProvide(TYPES.USECASE, PRODUCT_USECASE.UPDATE)
export class UpdateProductUsecase extends UpdateUsecase<IProductDomain, IUpdateProductInput, IUpdateProductOutput> {
    get DOMAIN() {
        return API_DOMAIN.PRODUCT;
    }

    get id() {
        return USER_USECASE.FIND_BY_ID;
    }

    constructor(
        @namedInject(TYPES.REPOSITORY, API_DOMAIN.PRODUCT)
        protected repository: IProductRepository
    ) {
        super(repository)
    }

    async execute(input: IUpdateProductInput): Promise<IUpdateProductOutput> {
        return super.execute(input)
    }
} 