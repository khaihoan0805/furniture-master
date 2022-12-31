import { IProductDomain } from './index';
import { BaseDomain } from '../../infrastructure/base/domain';
import { constructorProvide } from '../../infrastructure/ioc';
import { API_DOMAIN } from '../../const';

@constructorProvide(API_DOMAIN.PRODUCT)
export class ProductDomain extends BaseDomain<IProductDomain> implements IProductDomain {
    get id() {
        return this.context.id;
    }

    get image() {
        return this.context.image;
    }

    get name() {
        return this.context.name;
    }

    get status() {
        return this.context.status;
    }

    get slug() {
        return this.context.slug;
    }

    get description() {
        return this.context.description;
    }

    get attributes() {
        return this.context.attributes;
    }

    get categories() {
        return this.context.categories;
    }

    get createdAt() {
        return this.context.createdAt;
    }

    get createdBy() {
        return this.context.createdBy;
    }

    get updatedAt() {
        return this.context.updatedAt;
    }

    get updatedBy() {
        return this.context.updatedBy;
    }

    protected nameContext = API_DOMAIN.USER;

    json() {
        const {
            id,
            image,
            name,
            status,
            slug,
            description,
            attributes,
            categories,
            createdAt,
            createdBy,
            updatedAt,
            updatedBy
        } = this

        return {
            id,
            image,
            name,
            status,
            slug,
            description,
            attributes,
            categories,
            createdAt,
            createdBy,
            updatedAt,
            updatedBy
        }
    }

    toString() {
        return JSON.stringify(this.json())
    }
}