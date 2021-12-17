import { API_DOMAIN, ATTRIBUTE_VALUE_WORKFLOW, TYPES } from "../../../const";
import { IFIndAttributeValuebyIdOutput, IFindAttributeValueByIdInput } from "../../../controller";
import { IAttributeValueDomain } from "../../../domain";
import { IAttributeValueRepository } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { FindByIdWorkflow, IFindByIdWorkflow } from "../../base";

export interface IFindAttributeValueByIdWorkflow extends IFindByIdWorkflow<IAttributeValueDomain, IFindAttributeValueByIdInput, IFIndAttributeValuebyIdOutput> {}

@singletonNamedProvide(TYPES.WORKFLOW, ATTRIBUTE_VALUE_WORKFLOW.FIND_BY_ID)
export class FindAttributeValueByIdWorkflow extends FindByIdWorkflow<IAttributeValueDomain, IFindAttributeValueByIdInput, IFIndAttributeValuebyIdOutput> {
    get DOMAIN() {
        return API_DOMAIN.ATTRIBUTE_VALUE;
    }

    get id() {
        return ATTRIBUTE_VALUE_WORKFLOW.CREATE;
    }

    constructor(
        @namedInject(TYPES.REPOSITORY, API_DOMAIN.ATTRIBUTE_VALUE)
        protected repository: IAttributeValueRepository
    ) {
        super(repository)
    }
}