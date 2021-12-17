import { API_DOMAIN, TYPES } from "../../../const";
import { IProductCategoryDomain, ProductCategoryDomain } from "../../../domain";
import { singletonNamedProvide } from "../../ioc";
import { BaseDatabMapper, IDataMapper } from "../base";

export interface IProductCategoryMapper extends IDataMapper<IProductCategoryDomain> { }

@singletonNamedProvide(TYPES.MAPPER, API_DOMAIN.PRODUCT_CATEGORY)
export class ProductCategoryMapper extends BaseDatabMapper<IProductCategoryDomain> implements IProductCategoryMapper {
    protected entityType = API_DOMAIN.PRODUCT_CATEGORY;

    get toEntityFields() {
        const toEntityFields: string[] = [
            'id',
            'productId',
            'categoryId',
            'status',
            'createdAt',
            'updatedAt',
        ]

        return toEntityFields;
    }

    get toDatabaseFields() {
        const toDatabaseFields: string[] = [
            'productId',
            'categoryId',
            'status',
            'createdAt',
            'updatedAt',
        ]

        return toDatabaseFields;
    }
}