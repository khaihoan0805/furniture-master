import { API_DOMAIN, TYPES } from "../../../const";
import { IProductSKUDomain } from "../../../domain";
import { singletonNamedProvide } from "../../ioc";
import { BaseDatabMapper, IDataMapper } from "../base";

export interface IProductSKUMapper extends IDataMapper<IProductSKUDomain> {}

@singletonNamedProvide(TYPES.MAPPER, API_DOMAIN.PRODUCT_SKU)
export class ProductSKUMapper extends BaseDatabMapper<IProductSKUDomain> implements IProductSKUMapper {
    protected entityType = API_DOMAIN.PRODUCT_SKU;

    get toEntityFields() {
        const toEntityFields: string[] = [
            'id',
            'code',
            'productId',
            'image',
            'status',
            'quantity',
            'currentPrice',
            'price',
            'slug',
            'description',
            'createdAt',
            'updatedAt',
        ]

        return toEntityFields;
    }

    get toDatabaseFields() {
        const toDatabaseFields: string[] = [
            'code',
            'productId',
            'image',
            'status',
            'quantity',
            'currentPrice',
            'price',
            'slug',
            'description',
            'createdAt',
            'updatedAt',
        ]

        return toDatabaseFields;
    }
}