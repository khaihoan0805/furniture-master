import { API_DOMAIN, PRODUCT_USECASE, TYPES, USER_USECASE } from "../../../const";
import { IFindProductByIdInput } from "../../../controller/input/product/find-by-id.input";
import { IFindByIdOutput } from "../../../controller/output/base";
import { IFindProductByIdOutput } from "../../../controller/output/product/find-by-id.output";
import { IProductDomain } from "../../../domain";
import { IProductRepository } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { FindByIdUsecase, IFindByIdUsecase } from "../../base";

export interface IFindProductByIdUsecase extends IFindByIdUsecase<IProductDomain, IFindProductByIdInput, IFindProductByIdOutput> {}

@singletonNamedProvide(TYPES.USECASE, PRODUCT_USECASE.FIND_BY_ID)
export class FindProductByIdUsecase extends FindByIdUsecase<IProductDomain, IFindProductByIdInput, IFindProductByIdOutput> {
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

    async execute(input: IFindProductByIdInput): Promise<IFindProductByIdOutput> {
        return super.execute(input)
    }
}