import { API_DOMAIN, ATTRIBUTE_WORKFLOW, TYPES } from "../../../const";
import { ICreateAttributeInput, ICreateAttributeOutput } from "../../../controller";
import { AttributeDomain, IAttributeDomain } from "../../../domain";
import { IAttributeRepository, Operators } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { CreateWorkflow, ICreateWorkflow } from "../../base";

export interface ICreateAttributeWorkflow extends ICreateWorkflow<IAttributeDomain, ICreateAttributeInput, ICreateAttributeOutput> {}

@singletonNamedProvide(TYPES.WORKFLOW, ATTRIBUTE_WORKFLOW.CREATE)
export class CreateAttributeWorkflow extends CreateWorkflow<IAttributeDomain, ICreateAttributeInput, ICreateAttributeOutput> {
    get DOMAIN() {
        return API_DOMAIN.ATTRIBUTE;
    }

    get id() {
        return ATTRIBUTE_WORKFLOW.CREATE;
    }

    constructor(
        @namedInject(TYPES.REPOSITORY, API_DOMAIN.ATTRIBUTE)
        repository: IAttributeRepository
    ) {
        super(repository)
    }

    async validate(entity: AttributeDomain): Promise<void> {
        const isExisted = await this.repository.find({
            filters: [{
                code: 'name', operator: Operators.Equals, value: entity.name
            }]
        })

        if(isExisted.length > 0 ) {
            throw this.errorFactory.unauthorizedError(`This attribute name: ${entity.name} is already existed.`)
        }
    } 
}