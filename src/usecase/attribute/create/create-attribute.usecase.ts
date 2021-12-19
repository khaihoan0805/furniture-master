import { API_DOMAIN, ATTRIBUTE_USECASE, TYPES } from "../../../const";
import { ICreateAttributeInput, ICreateAttributeOutput } from "../../../controller";
import { AttributeDomain, IAttributeDomain } from "../../../domain";
import { IAttributeRepository, Operators } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { CreateUsecase, ICreateUsecase } from "../../base";

export interface ICreateAttributeUsecase extends ICreateUsecase<IAttributeDomain, ICreateAttributeInput, ICreateAttributeOutput> {}

@singletonNamedProvide(TYPES.USECASE, ATTRIBUTE_USECASE.CREATE)
export class CreateAttributeUsecase extends CreateUsecase<IAttributeDomain, ICreateAttributeInput, ICreateAttributeOutput> {
    get DOMAIN() {
        return API_DOMAIN.ATTRIBUTE;
    }

    get id() {
        return ATTRIBUTE_USECASE.CREATE;
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