import { API_DOMAIN, ATTRIBUTE_VALUE_USECASE, TYPES } from "../../../const";
import { ICreateAttributeValueInput, ICreateAttributeValueOutput } from "../../../controller";
import { IAttributeValueDomain } from "../../../domain";
import { IAttributeRepository, IAttributeValueRepository, Operators } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { CreateUsecase, ICreateUsecase } from "../../base";

export interface ICreateAttributeValueUsecase extends ICreateUsecase<IAttributeValueDomain, ICreateAttributeValueInput, ICreateAttributeValueOutput> { }

@singletonNamedProvide(TYPES.USECASE, ATTRIBUTE_VALUE_USECASE.CREATE)
export class CreateAttributeValueUsecase extends CreateUsecase<IAttributeValueDomain, ICreateAttributeValueInput, ICreateAttributeValueOutput> {
    get DOMAIN() {
        return API_DOMAIN.ATTRIBUTE_VALUE;
    }

    get id() {
        return ATTRIBUTE_VALUE_USECASE.CREATE;
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