import { API_DOMAIN, TYPES } from "../../../const";
import { AttributeDomain, IAttributeDomain } from "../../../domain";
import { singletonNamedProvide } from "../../ioc";
import { BaseDatabMapper, IDataMapper } from "../base";

export interface IAttributeMapper extends IDataMapper<IAttributeDomain> { }

@singletonNamedProvide(TYPES.MAPPER, API_DOMAIN.ATTRIBUTE)
export class AttributeMapper extends BaseDatabMapper<IAttributeDomain> implements IAttributeMapper {
    protected entityType = API_DOMAIN.ATTRIBUTE;

    get toEntityFields() {
        const toEntityFields: string[] = [
            'id',
            'name',
            'status',
            'createdBy',
            'createdAt',
            'updatedBy',
            'updatedAt',
        ]

        return toEntityFields;
    }

    get toDatabaseFields() {
        const toDatabaseFields: string[] = [
            'name',
            'status',
            'createdBy',
            'createdAt',
            'updatedBy',
            'updatedAt',
        ]

        return toDatabaseFields;
    }
}