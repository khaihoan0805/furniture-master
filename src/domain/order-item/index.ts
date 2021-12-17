import { IDomain } from "../../infrastructure/base/domain";

export interface IOrderItem {
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface IOrderItemDomain extends IDomain, IOrderItem {}

export * from './order-item.domain';