import { IDomain } from "../../infrastructure/base";
import { IProductSKUAttributeValueDomain } from "../product-sku-attribute-value";

export interface IProductSKU {
    code: string;
    productId: number;
    image: string;
    status: number;
    quantity: number;
    currentPrice: number;
    price: number;
    slug: string;
    description: string;
    attributeValues?: (IProductSKUAttributeValueDomain | null | number)[];
    createdAt: Date;
    updatedAt: Date; 
}

export interface IProductSKUDomain extends IDomain, IProductSKU {}

export * from './product-sku.domain';