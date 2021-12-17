import { API_DOMAIN, ATTRIBUTE_VALUE_WORKFLOW, TYPES } from "../../../const";
import { ICreateAttributeValueInput, ICreateAttributeValueOutput } from "../../../controller";
import { IAttributeValueDomain } from "../../../domain";
import { IAttributeRepository, IAttributeValueRepository, Operators } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { CreateWorkflow, ICreateWorkflow } from "../../base";

export interface ICreateAttributeValueWorkflow extends ICreateWorkflow<IAttributeValueDomain, ICreateAttributeValueInput, ICreateAttributeValueOutput> { }

@singletonNamedProvide(TYPES.WORKFLOW, ATTRIBUTE_VALUE_WORKFLOW.CREATE)
export class CreateAttributeValueWorkflow extends CreateWorkflow<IAttributeValueDomain, ICreateAttributeValueInput, ICreateAttributeValueOutput> {
    get DOMAIN() {
        return API_DOMAIN.ATTRIBUTE_VALUE;
    }

    get id() {
        return ATTRIBUTE_VALUE_WORKFLOW.CREATE;
    }
    
    @namedInject(TYPES.REPOSITORY, API_DOMAIN.ATTRIBUTE)
    protected attributeRepository: IAttributeRepository;

    constructor(
        @namedInject(TYPES.REPOSITORY, API_DOMAIN.ATTRIBUTE_VALUE)
        protected repository: IAttributeValueRepository
    ) {
        super(repository)
    }

    async validate(entity: IAttributeValueDomain): Promise<void> {
        const isExistedAttribute = await this.attributeRepository.findById(entity.id)

        if(!isExistedAttribute) {
            throw this.errorFactory.unauthorizedError(`This attribute ${entity.id} is not existed.`)
        }

        const isExisted = await this.repository.find({
            filters: [
                { code: 'attributeId', operator: Operators.Equals, value: entity.attributeId },
                { code: 'value', operator: Operators.Equals, value: entity.value }
            ]
        })

        if(isExisted) {
            throw this.errorFactory.unauthorizedError(`This attribute-value ${isExisted.toString()} is existed`)
        }
    }

    async execute(input: ICreateAttributeValueInput): Promise<ICreateAttributeValueOutput> {
        return super.execute(input)
    }
}