import { IDomain } from "../../infrastructure/base";

export interface IAttributeValue {
    attributeId: number;
    value: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface IAttributeValueDomain extends IDomain, IAttributeValue {}

export * from './attribute-value.domain';