import { API_DOMAIN, ATTRIBUTE_VALUE_USECASE, TYPES } from "../../../const";
import { IUpdateAttributeValueInput, IUpdateAttributeValueOutput } from "../../../controller";
import { IAttributeValueDomain } from "../../../domain";
import { IAttributeRepository, IAttributeValueRepository, Operators } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { IUpdateUsecase, UpdateUsecase } from "../../base";

export interface IUpdateAttributeValueUsecase extends IUpdateUsecase<IAttributeValueDomain, IUpdateAttributeValueInput, IUpdateAttributeValueOutput> { }

@singletonNamedProvide(TYPES.USECASE, ATTRIBUTE_VALUE_USECASE.UPDATE)
export class UpdateAttributeValueUsecase extends UpdateUsecase<IAttributeValueDomain, IUpdateAttributeValueInput, IUpdateAttributeValueOutput> {
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

    async execute(input: IUpdateAttributeValueInput): Promise<IUpdateAttributeValueOutput> {
        const entity = <IAttributeValueDomain>this.entityFactory.create(this.DOMAIN.toString(), input)

        if (entity.attributeId || entity.value) {
            const isExistedAttribute = await this.attributeRepository.findById(entity.id)

            if (!isExistedAttribute) {
                throw this.errorFactory.unauthorizedError(`This attribute ${entity.id} is not existed.`)
            }

            const isExisted = await this.repository.find({
                filters: [
                    { code: 'attributeId', operator: Operators.Equals, value: entity.attributeId },
                    { code: 'value', operator: Operators.Equals, value: entity.value }
                ]
            })

            if (isExisted) {
                throw this.errorFactory.unauthorizedError(`This attribute-value ${isExisted.toString()} is existed`)
            }
        }
        
        return super.execute(input);
    }
}