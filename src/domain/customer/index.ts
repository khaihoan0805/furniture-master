import { IDomain } from "../../infrastructure/base/domain";

export interface ICustomer {
    status: number;
    name: string;
    email: string;
    occupation: string;
    age: number;
    phone: string;
    defaultAdress: string;
    createdBy: number;
    createdAt: Date;
    updatedBy: number;
    updatedAt: Date;
}

export interface ICustomerDomain extends IDomain, ICustomer {}