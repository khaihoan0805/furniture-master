import { IDomain } from "../../infrastructure/base/domain";

export interface IOrder {
    customerId: number;
    status: number;
    channelId: number;
    type: number;
    note: string;
    city: number;
    district: number;
    shippingMethod: number;
    paymentMethod: number;
    shippingCost: number;
    saleCost: number;
    createdBy: number;
    createdAt: Date;
    updatedBy: number;
    updatedAt: Date
}

export interface IOrderDomain extends IDomain, IOrder {}

export * from './order.domain';