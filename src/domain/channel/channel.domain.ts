import { IChannelDomain } from '.';
import { API_DOMAIN } from '../../const';
import { BaseDomain } from '../../infrastructure/base/domain';
import { singletonProvide } from '../../infrastructure/ioc';

@singletonProvide(API_DOMAIN.CHANNEL)
export class ChannelDomain extends BaseDomain<IChannelDomain> implements IChannelDomain {
    get id() {
        return this.context.id;
    }

    get name() {
        return this.context.name;
    }

    get createdAt() {
        return this.context.createdAt;
    }

    get updatedAt() {
        return this.context.updatedAt;
    }

    protected nameContext = API_DOMAIN.CHANNEL;

    json() {
        const {
            id,
            name,
            createdAt,
            updatedAt
        } = this;

        return {
            id,
            name,
            createdAt,
            updatedAt
        }
    }

    toString() {
        return JSON.stringify(this.json());
    }
}
