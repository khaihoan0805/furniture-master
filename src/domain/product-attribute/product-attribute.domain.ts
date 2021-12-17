import { IProductAttributeDomain } from './index';
import { API_DOMAIN } from '../../const';
import { BaseDomain } from '../../infrastructure/base/domain';
import { constructorProvide } from '../../infrastructure/ioc';

@constructorProvide(API_DOMAIN.PRODUCT_ATTRIBUTE)
export class ProductAttributeDomain extends BaseDomain<IProductAttributeDomain> implements IProductAttributeDomain {
    get id() {
        return this.context.id;
    }

    get productId() {
        return this.context.productId;
    }

    get attributeId() {
        return this.context.attributeId;
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
    protected nameContext = API_DOMAIN.PRODUCT_ATTRIBUTE;

    json() {
        const {
            id,
            productId,
            attributeId,
            status,
            createdAt,
            updatedAt
        } = this;

        return {
            id,
            productId,
            attributeId,
            status,
            createdAt,
            updatedAt
        }
    }

    toString() {
        return JSON.stringify(this.json())
    }
}