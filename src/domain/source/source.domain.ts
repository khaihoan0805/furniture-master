import { ISourceDomain } from '.';
import { API_DOMAIN } from '../../const';
import { BaseDomain } from '../../infrastructure/base/domain';
import {} from '../../infrastructure/ioc';

export class SourceDomain extends BaseDomain<ISourceDomain> implements ISourceDomain {
    get id() {
        return this.context.id;
    }

    get channelId() {
        return this.context.channelId;
    }

    get customerId() {
        return this.context.customerId;
    }

    get name() {
        return this.context.name;
    }

    get sourceId() {
        return this.context.sourceId;
    }

    get sourceUrl() {
        return this.context.sourceUrl;
    }

    get createdAt() {
        return this.context.createdAt;
    }

    get updatedAt() {
        return this.context.updatedAt;
    }

    protected nameContext = API_DOMAIN.SOURCE;

    json() {
        const {
            id,
            channelId,
            customerId,
            name,
            sourceId,
            sourceUrl,
            createdAt,
            updatedAt
        } = this;

        return {
            id,
            channelId,
            customerId,
            name,
            sourceId,
            sourceUrl,
            createdAt,
            updatedAt
        }
    }

    toString() {
        return JSON.stringify(this.json());
    }
}