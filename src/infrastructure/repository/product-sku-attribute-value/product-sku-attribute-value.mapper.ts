import { API_DOMAIN, TYPES } from "../../../const";
import { IProductSKUAttributeValueDomain } from "../../../domain";
import { singletonNamedProvide } from "../../ioc";
import { BaseDatabMapper, IDataMapper } from "../base";

export interface IProductSKUAttributeValueMapper extends IDataMapper<IProductSKUAttributeValueDomain> {}

@singletonNamedProvide(TYPES.MAPPER, API_DOMAIN.PRODUCT_SKU_ATTRIBUTE_VALUE)
export class ProductSKUAttributeValueMapper extends BaseDatabMapper<IProductSKUAttributeValueDomain> implements IProductSKUAttributeValueMapper {
    protected entityType = API_DOMAIN.PRODUCT;

    get toEntityFields() {
        const toEntityFields: string[] = [
            'id',
            'skuId',
            'attributeId',
            'attributeValueId',
            'attributeName',
            'attributeValue',
            'status',
            'createdAt',
            'updatedAt'
        ]

        return toEntityFields;
    }

    get toDatabaseFields() {
        const toDatabaseFields: string[] = [
            'skuId',
            'attributeId',
            'attributeValueId',
            'attributeName',
            'attributeValue',
            'status',
            'createdAt',
            'updatedAt'
        ]

        return toDatabaseFields;
    }
}