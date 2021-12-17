import { IOrderItemDomain } from '.';
import { API_DOMAIN } from '../../const';
import { BaseDomain } from '../../infrastructure/base/domain';
import { singletonProvide } from '../../infrastructure/ioc';

@singletonProvide(API_DOMAIN.ORDER_ITEM)
export class OrderItemDomain extends BaseDomain<IOrderItemDomain> implements IOrderItemDomain {
    get id() {
        return this.context.id;
    }

    get orderId() {
        return this.context.orderId;
    }

    get productId() {
        return this.context.productId;
    }

    get quantity() {
        return this.context.quantity;
    }

    get price() {
        return this.context.price;
    }

    get createdAt() {
        return this.context.createdAt;
    }

    get updatedAt() {
        return this.context.updatedAt;
    }

    protected nameContext = API_DOMAIN.ORDER_ITEM;

    json() {
        const {
            id,
            orderId,
            productId,
            quantity,
            price,
            createdAt,
            updatedAt
        } = this;

        return {
            id,
            orderId,
            productId,
            quantity,
            price,
            createdAt,
            updatedAt
        }
    }

    toString() {
        return JSON.stringify(this.json());
    }
}