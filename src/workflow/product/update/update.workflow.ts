import { API_DOMAIN, PRODUCT_WORKFLOW, TYPES, USER_WORKFLOW } from "../../../const";
import { IUpdateProductInput } from "../../../controller/input/product/update.input";
import { IUpdateProductOutput } from "../../../controller/output/product/update.input";
import { IProductDomain } from "../../../domain";
import { IProductRepository } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { IUpdateWorkflow, UpdateWorkflow } from "../../base";

export interface IUpdateProductWorkflow extends IUpdateWorkflow<IProductDomain, IUpdateProductInput, IUpdateProductOutput> {}

@singletonNamedProvide(TYPES.WORKFLOW, PRODUCT_WORKFLOW.UPDATE)
export class UpdateProductWorkflow extends UpdateWorkflow<IProductDomain, IUpdateProductInput, IUpdateProductOutput> {
    get DOMAIN() {
        return API_DOMAIN.PRODUCT;
    }

    get id() {
        return USER_WORKFLOW.FIND_BY_ID;
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