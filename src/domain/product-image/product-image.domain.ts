import { IProductImageDomain } from '.';
import { API_DOMAIN } from '../../const';
import { BaseDomain } from '../../infrastructure/base/domain';
import {} from '../../infrastructure/ioc';

export class ProductImageDomain extends BaseDomain<IProductImageDomain> implements IProductImageDomain {
    get id() {
        return this.context.id;
    }

    get productId() {
        return this.context.productId;
    }

    get imageId() {
        return this.context.imageId;
    }

    get createdAt() {
        return this.context.createdAt;
    }

    get updatedAt() {
        return this.context.updatedAt;
    }

    protected nameContext = API_DOMAIN.PRODUCT_IMAGE;

    json() {
        const {
            id,
            productId,
            imageId,
            createdAt,
            updatedAt
        } = this;

        return {
            id,
            productId,
            imageId,
            createdAt,
            updatedAt
        }
    }

    toString() {
        return JSON.stringify(this.json())
    }
}