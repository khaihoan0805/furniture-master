import { API_DOMAIN, PRODUCT_USECASE, TYPES } from "../../../const";
import { IPaginateProductInput, IPaginateProductOutput } from "../../../controller";
import { IProductDomain } from "../../../domain";
import { IProductRepository } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { IPaginateUsecase, PaginateUsecase } from "../../base";

export interface IPaginateProductUsecase extends IPaginateUsecase<IProductDomain, IPaginateProductInput, IPaginateProductOutput> { }

@singletonNamedProvide(TYPES.USECASE, PRODUCT_USECASE.PAGINATE)
export class PaginateProductUsecase extends PaginateUsecase<IProductDomain, IPaginateProductInput, IPaginateProductOutput> {
    get DOMAIN() {
        return API_DOMAIN.PRODUCT;
    }

    get id() {
        return PRODUCT_USECASE.PAGINATE;
    }

    constructor(
        @namedInject(TYPES.REPOSITORY, API_DOMAIN.PRODUCT)
        protected repository: IProductRepository
    ) {
        super(repository)
    }

    async execute(input: IPaginateProductInput): Promise<IPaginateProductOutput> {
        return super.execute(input)
    }
}