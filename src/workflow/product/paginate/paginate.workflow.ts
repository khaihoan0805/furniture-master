import { API_DOMAIN, PRODUCT_WORKFLOW, TYPES } from "../../../const";
import { IPaginateProductInput, IPaginateProductOutput } from "../../../controller";
import { IProductDomain } from "../../../domain";
import { IProductRepository } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { IPaginateWorkflow, PaginateWorkflow } from "../../base";

export interface IPaginateProductWorkflow  extends IPaginateWorkflow<IProductDomain, IPaginateProductInput, IPaginateProductOutput> {}

@singletonNamedProvide(TYPES.WORKFLOW, PRODUCT_WORKFLOW.PAGINATE)
export class PaginateProductWorkflow extends PaginateWorkflow<IProductDomain, IPaginateProductInput, IPaginateProductOutput> {
    get DOMAIN() {
        return API_DOMAIN.PRODUCT;
    }

    get id() {
        return PRODUCT_WORKFLOW.PAGINATE;
    }

    constructor(    
        @namedInject(TYPES.REPOSITORY, API_DOMAIN.PRODUCT)
        protected repository: IProductRepository
    ) {
        super(repository)
    }

    async execute(input: IPaginateProductInput): Promise<IPaginateProductOutput> {
        console.log(`offset: `,input.offset)
        return super.execute(input)
    }
}