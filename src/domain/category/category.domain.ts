import { ICategoryDomain } from './index';
import { API_DOMAIN } from '../../const';
import { BaseDomain } from '../../infrastructure/base/domain';
import { constructorProvide } from '../../infrastructure/ioc';

@constructorProvide(API_DOMAIN.CATEGORY)
export class CategoryDomain extends BaseDomain<ICategoryDomain> implements ICategoryDomain{
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
        return this.context.status
    }

    get description() {
        return this.context.description;
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

    protected nameContext = API_DOMAIN.CATEGORY;

    json() {
        const {
            id,
            image,
            name,
            status,
            description,
            createdAt,
            createdBy,
            updatedAt,
            updatedBy
        } = this;
        
        return {
            id,
            image,
            name,
            status,
            description,
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