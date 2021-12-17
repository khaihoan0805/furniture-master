import { API_DOMAIN, TYPES } from "../../../const";
import { IProductDomain, ProductDomain } from "../../../domain";
import { singletonNamedProvide } from "../../ioc";
import { BaseDatabMapper, IDataMapper } from "../base";

export interface IProductMapper extends IDataMapper<IProductDomain> { }

@singletonNamedProvide(TYPES.MAPPER, API_DOMAIN.PRODUCT)
export class ProductMapper extends BaseDatabMapper<IProductDomain> implements IProductMapper {
    protected entityType = API_DOMAIN.PRODUCT;

    get toEntityFields() {
        const toEntityFields: string[] = [
            'id',
            'image',
            'name',
            'status',
            'slug',
            'description',
            'attributes',
            'categories',
            'createdBy',
            'createdAt',
            'updatedBy',
            'updatedAt',
        ]

        return toEntityFields;
    }

    get toDatabaseFields() {
        const toDatabaseFields: string[] = [
            'id',
            'image',
            'name',
            'status',
            'slug',
            'description',
            'attributes',
            'categories',
            'createdBy',
            'createdAt',
            'updatedBy',
            'updatedAt',
        ]

        return toDatabaseFields;
    }
}