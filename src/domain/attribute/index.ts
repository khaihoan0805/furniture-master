import { IDomain } from "../../infrastructure/base/domain";

export interface IAttribute {
    name: string;
    status: number;
    createdBy: number;
    createdAt: Date;
    updatedBy: number;
    updatedAt: Date;
}

export interface IAttributeDomain extends IDomain, IAttribute {}

export * from './attribute.domain';