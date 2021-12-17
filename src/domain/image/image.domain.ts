import { IImageDomain } from '.';
import { API_DOMAIN } from '../../const';
import { BaseDomain } from '../../infrastructure/base/domain';
import {} from '../../infrastructure/ioc';

export class ImageDomain extends BaseDomain<IImageDomain> implements IImageDomain {
    get id() {
        return this.context.id;
    }

    get name() {
        return this.context.name;
    }

    get url() {
        return this.context.url;
    }

    get description() {
        return this.context.description;
    }

    get createdAt() {
        return this.context.createdAt;
    }

    get updatedAt() {
        return this.context.updatedAt;
    }

    protected nameContext = API_DOMAIN.IMAGE;

    json() {
        const {
            id,
            name,
            url,
            description,
            createdAt,
            updatedAt
        } = this;

        return {
            id,
            name,
            url,
            description,
            createdAt,
            updatedAt
        }
    }

    toString() {
        return JSON.stringify(this.json());
    }
}