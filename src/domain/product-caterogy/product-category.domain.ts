import { IProductCategoryDomain } from './index';
import { API_DOMAIN } from '../../const';
import { BaseDomain } from '../../infrastructure/base/domain';
import { constructorProvide } from '../../infrastructure/ioc';


@constructorProvide(API_DOMAIN.PRODUCT_CATEGORY)
export class ProductCategoryDomain extends BaseDomain<IProductCategoryDomain> implements IProductCategoryDomain {
    get id() {
        return this.context.id;
    }

    get productId() {
        return this.context.productId;
    }

    get categoryId() {
        return this.context.categoryId;
    }

    get status() {
        return this.context.status;
    }

    get createdAt() {
        return this.context.createdAt;
    }

    get updatedAt() {
        return this.context.updatedAt;
    }

    protected nameContext = API_DOMAIN.PRODUCT_CATEGORY;

    json() {
        const {
            id,
            productId,
            categoryId,
            status,
            createdAt,
            updatedAt
        } = this;
        
        return {
            id,
            productId,
            categoryId,
            status,
            createdAt,
            updatedAt
        }
    }

    toString() {
        return JSON.stringify(this.json())
    }
}