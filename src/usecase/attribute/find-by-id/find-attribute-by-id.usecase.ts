import { API_DOMAIN, ATTRIBUTE_USECASE, TYPES } from "../../../const";
import { IFindAttributeByIdInput, IFindAttributeByIdOutput } from "../../../controller";
import { AttributeDomain, IAttributeDomain } from "../../../domain";
import { IAttributeRepository } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { FindByIdUsecase, IFindByIdUsecase } from "../../base";

export interface IFindAttributeByIdUsecase extends IFindByIdUsecase<IAttributeDomain, IFindAttributeByIdInput, IFindAttributeByIdOutput> {}

@singletonNamedProvide(TYPES.USECASE, ATTRIBUTE_USECASE.FIND_BY_ID)
export class FindAttributeByIdUsecase extends FindByIdUsecase<IAttributeDomain, IFindAttributeByIdInput, IFindAttributeByIdOutput> {
    get DOMAIN() {
        return API_DOMAIN.ATTRIBUTE;
    }

    get id() {
        return ATTRIBUTE_USECASE.FIND_BY_ID;
    }

    constructor(
        @namedInject(TYPES.REPOSITORY, API_DOMAIN.ATTRIBUTE)
        repository: IAttributeRepository
    ) {
        super(repository)
    }
}