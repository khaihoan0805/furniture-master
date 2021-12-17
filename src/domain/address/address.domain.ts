import { IAddressDomain } from '.';
import { API_DOMAIN } from '../../const';
import { BaseDomain } from '../../infrastructure/base/domain';
import { singletonProvide } from '../../infrastructure/ioc';

@singletonProvide(API_DOMAIN.ADDRESS)
export class AddressDomain extends BaseDomain<IAddressDomain> implements IAddressDomain {
    get id() {
        return this.context.id;
    }

    get customerId() {
        return this.context.customerId;
    }

    get name() {
        return this.context.name;
    }

    get status() {
        return this.context.status;
    }

    get city() {
        return this.context.city;
    }

    get district() {
        return this.context.district;
    }

    get ward() {
        return this.context.ward;
    }

    get address() {
        return this.context.address;
    }

    get createdAt() {
        return this.context.createdAt;
    }

    get updatedAt() {
        return this.context.updatedAt;
    }

    protected nameContext = API_DOMAIN.ADDRESS;

    json() {
        const {
            id,
            customerId,
            name,
            status,
            city,
            district,
            ward,
            address,
            createdAt,
            updatedAt
        } = this;

        return {
            id,
            customerId,
            name,
            status,
            city,
            district,
            ward,
            address,
            createdAt,
            updatedAt
        }
    }

    toString() {
        return JSON.stringify(this.json());
    }
}