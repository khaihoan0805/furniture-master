import { API_DOMAIN, TYPES } from "../../../const";
import { IAttributeValueDomain } from "../../../domain";
import { singletonNamedProvide } from "../../ioc";
import { BaseDatabMapper, IDataMapper } from "../base";

export interface IAttributeValueMapper extends IDataMapper<IAttributeValueDomain> {}

@singletonNamedProvide(TYPES.MAPPER, API_DOMAIN.ATTRIBUTE_VALUE)
export class AttributeValueMapper extends BaseDatabMapper<IAttributeValueDomain> implements IAttributeValueMapper {
    protected entityType = API_DOMAIN.ATTRIBUTE_VALUE;

    get toEntityFields() {
        const toEntityFields: string[] = [
            'id',
            'attributeId',
            'value',
            'status',
            'createdAt',
            'updatedAt'
        ]

        return toEntityFields;
    }

    get toDatabaseFields() {
        const toDatabaseFields: string[] = [
            'attributeId',
            'value',
            'status',
            'createdAt',
            'updatedAt'
        ]

        return toDatabaseFields;
    }
}