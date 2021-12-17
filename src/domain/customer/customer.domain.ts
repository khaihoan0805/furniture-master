import { ICustomerDomain } from '.';
import { API_DOMAIN } from '../../const';
import { BaseDomain } from '../../infrastructure/base/domain';
import { singletonProvide } from '../../infrastructure/ioc';

@singletonProvide(API_DOMAIN.CUSTOMER)
export class CustomerDomain extends BaseDomain<ICustomerDomain> implements ICustomerDomain {
    get id() {
        return this.context.id;
    }

    get name() {
        return this.context.name;
    }

    get status() {
        return this.context.status;
    }

    get email() {
        return this.context.email;
    }

    get occupation() {
        return this.context.occupation;
    }

    get age() {
        return this.context.age;
    }

    get phone() {
        return this.context.phone;
    }

    get defaultAdress() {
        return this.context.defaultAdress;
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

    protected nameContext = API_DOMAIN.CUSTOMER;

    json() {
        const {
            id,
            status,
            email,
            occupation,
            age,
            phone,
            defaultAdress,
            createdAt,
            createdBy,
            updatedAt,
            updatedBy
        } = this;

        return {
            id,
            status,
            email,
            occupation,
            age,
            phone,
            defaultAdress,
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
