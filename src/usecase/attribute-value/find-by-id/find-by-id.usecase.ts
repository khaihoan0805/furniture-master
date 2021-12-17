import { API_DOMAIN, ATTRIBUTE_VALUE_USECASE, TYPES } from "../../../const";
import { IFIndAttributeValuebyIdOutput, IFindAttributeValueByIdInput } from "../../../controller";
import { IAttributeValueDomain } from "../../../domain";
import { IAttributeValueRepository } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { FindByIdUsecase, IFindByIdUsecase } from "../../base";

export interface IFindAttributeValueByIdUsecase extends IFindByIdUsecase<IAttributeValueDomain, IFindAttributeValueByIdInput, IFIndAttributeValuebyIdOutput> {}

@singletonNamedProvide(TYPES.USECASE, ATTRIBUTE_VALUE_USECASE.FIND_BY_ID)
export class FindAttributeValueByIdUsecase extends FindByIdUsecase<IAttributeValueDomain, IFindAttributeValueByIdInput, IFIndAttributeValuebyIdOutput> {
    get DOMAIN() {
        return API_DOMAIN.ATTRIBUTE_VALUE;
    }

    get id() {
        return ATTRIBUTE_VALUE_USECASE.CREATE;
    }

    constructor(
        @namedInject(TYPES.REPOSITORY, API_DOMAIN.ATTRIBUTE_VALUE)
        protected repository: IAttributeValueRepository
    ) {
        super(repository)
    }
}