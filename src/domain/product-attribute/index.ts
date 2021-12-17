import { IDomain } from "../../infrastructure/base/domain";
import { IAttributeDomain } from "../attribute";
import { IProductDomain } from "../product";

export interface IProductAttribute {
    productId: number | IProductDomain;
    attributeId: number | IAttributeDomain;
    status: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface IProductAttributeDomain extends IDomain, IProductAttribute {}

export * from './product-attribute.domain';