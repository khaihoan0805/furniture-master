import { API_DOMAIN, PRODUCT_SKU_WORKFLOW, TYPES } from "../../../const";
import { IUpdateProductSKUInput, IUpdateProductSKUOutput } from "../../../controller";
import { IProductSKUDomain } from "../../../domain";
import { IProductSKURepository } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { IUpdateWorkflow, UpdateWorkflow } from "../../base";

export interface IUpdateProductSKUWorkflow extends IUpdateWorkflow<IProductSKUDomain, IUpdateProductSKUInput, IUpdateProductSKUOutput> {}

@singletonNamedProvide(TYPES.WORKFLOW, PRODUCT_SKU_WORKFLOW.UPDATE)
export class UpdateProductSKUWorkflow extends UpdateWorkflow<IProductSKUDomain, IUpdateProductSKUInput, IUpdateProductSKUOutput> {
    get DOMAIN() {
        return API_DOMAIN.PRODUCT_SKU;
    }

    get id() {
        return PRODUCT_SKU_WORKFLOW.UPDATE;
    }

    constructor(
        @namedInject(TYPES.REPOSITORY, API_DOMAIN.PRODUCT_SKU)
        protected repository: IProductSKURepository
    ) {
        super(repository)
    }
}
