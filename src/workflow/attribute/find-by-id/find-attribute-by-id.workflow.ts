import { API_DOMAIN, ATTRIBUTE_WORKFLOW, TYPES } from "../../../const";
import { IFindAttributeByIdInput, IFindAttributeByIdOutput } from "../../../controller";
import { AttributeDomain, IAttributeDomain } from "../../../domain";
import { IAttributeRepository } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { FindByIdWorkflow, IFindByIdWorkflow } from "../../base";

export interface IFindAttributeByIdWorkflow extends IFindByIdWorkflow<IAttributeDomain, IFindAttributeByIdInput, IFindAttributeByIdOutput> {}

@singletonNamedProvide(TYPES.WORKFLOW, ATTRIBUTE_WORKFLOW.FIND_BY_ID)
export class FindAttributeByIdWorkflow extends FindByIdWorkflow<IAttributeDomain, IFindAttributeByIdInput, IFindAttributeByIdOutput> {
    get DOMAIN() {
        return API_DOMAIN.ATTRIBUTE;
    }

    get id() {
        return ATTRIBUTE_WORKFLOW.FIND_BY_ID;
    }

    constructor(
        @namedInject(TYPES.REPOSITORY, API_DOMAIN.ATTRIBUTE)
        repository: IAttributeRepository
    ) {
        super(repository)
    }
}