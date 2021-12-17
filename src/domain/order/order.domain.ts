import { IOrderDomain } from '.';
import { API_DOMAIN } from '../../const';
import { BaseDomain } from '../../infrastructure/base/domain';
import { singletonProvide } from '../../infrastructure/ioc';

@singletonProvide(API_DOMAIN.ORDER)
export class OrderDomain extends BaseDomain<IOrderDomain> implements IOrderDomain {
    get id() {
        return this.context.id;
    }

    get customerId() {
        return this.context.customerId;
    }

    get status() {
        return this.context.status;
    } 

    get channelId() {
        return this.context.channelId;
    }

    get type() {
        return this.context.type;
    }

    get note() {
        return this.context.note;
    }

    get city() {
        return this.context.city;
    }

    get district() {
        return this.context.district;
    }

    get shippingMethod() {
        return this.context.shippingMethod;
    }

    get shippingCost() {
        return this.context.shippingCost;
    }

    get paymentMethod() {
        return this.context.paymentMethod;
    }

    get saleCost() {
        return this.context.saleCost;
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

    protected nameContext = API_DOMAIN.ORDER;

    json() {
        const {
            id,
            status,
            channelId,
            type,
            note,
            city,
            district,
            shippingMethod,
            shippingCost,
            paymentMethod,
            saleCost
        } = this;

        return {
            id,
            status,
            channelId,
            type,
            note,
            city,
            district,
            shippingMethod,
            shippingCost,
            paymentMethod,
            saleCost
        }
    }

    toString() {
        return JSON.stringify(this.json());
    }
}