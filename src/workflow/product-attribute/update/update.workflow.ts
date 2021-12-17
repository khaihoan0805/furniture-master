import { API_DOMAIN, PRODUCT_ATTRIBUTE_WORKFLOW, TYPES } from "../../../const";
import { IFindProductAttributeByIdInput, IFindProductAttributeByIdOutput } from "../../../controller";
import { IProductAttributeDomain } from "../../../domain";
import { IProductAttributeRepository } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { IUpdateWorkflow, UpdateWorkflow } from "../../base";

export interface IUpdateProductAttributeWorkflow extends IUpdateWorkflow<IProductAttributeDomain, IFindProductAttributeByIdInput, IFindProductAttributeByIdOutput> {}

@singletonNamedProvide(TYPES.WORKFLOW, PRODUCT_ATTRIBUTE_WORKFLOW.UPDATE)
export class UpdateProductAttributeWorkflow extends UpdateWorkflow<IProductAttributeDomain, IFindProductAttributeByIdInput, IFindProductAttributeByIdOutput> {
    get DOMAIN() {
        return API_DOMAIN.PRODUCT_ATTRIBUTE;
    }

    get id() {
        return PRODUCT_ATTRIBUTE_WORKFLOW.CREATE;
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