import { API_DOMAIN, TYPES } from "../../../const";
import { IProductAttributeDomain, ProductAttributeDomain } from "../../../domain";
import { singletonNamedProvide } from "../../ioc";
import { BaseDatabMapper, IDataMapper } from "../base";

export interface IProductAttributeMapper extends IDataMapper<IProductAttributeDomain> { }

@singletonNamedProvide(TYPES.MAPPER, API_DOMAIN.PRODUCT_ATTRIBUTE)
export class ProductAttributeMapper extends BaseDatabMapper<IProductAttributeDomain> implements IProductAttributeMapper {
    protected entityType = API_DOMAIN.PRODUCT_ATTRIBUTE;

    get toEntityFields() {
        const toEntityFields: string[] = [
            'id',
            'productId',
            'attributeId',
            'status',
            'createdAt',
            'updatedAt',
        ]

        return toEntityFields;
    }

    get toDatabaseFields() {
        const toDatabaseFields: string[] = [
            'productId',
            'attributeId',
            'status',
            'createdAt',
            'updatedAt',
        ]

        return toDatabaseFields;
    }
}