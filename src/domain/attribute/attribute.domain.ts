import { IAttributeDomain } from '.';
import { API_DOMAIN } from '../../const';
import { BaseDomain } from '../../infrastructure/base/domain';
import { constructorProvide } from '../../infrastructure/ioc';

@constructorProvide(API_DOMAIN.ATTRIBUTE)
export class AttributeDomain extends BaseDomain<IAttributeDomain> implements IAttributeDomain {
    get id() {
        return this.context.id;
    }

    get name() {
        return this.context.name;
    }

    get status() {
        return this.context.status;
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

    protected nameContext = API_DOMAIN.ATTRIBUTE;

    json() {
        const {
            id,
            name,
            status,
            createdAt,
            createdBy,
            updatedAt,
            updatedBy
        } = this
        
        return {
            id,
            name,
            status,
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