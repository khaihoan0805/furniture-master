import { IDomain } from "../../infrastructure/base/domain";

export interface IAddress {
    customerId: number;
    name: string;
    status: number;
    city: number;
    district: number;
    ward: number;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IAddressDomain extends IDomain, IAddress {}

export * from './address.domain';