import { IDomain } from '../../infrastructure/base';

export interface IProductSKUAttributeValue {
    skuId: number;
    attributeId: number;
    attributeValueId: number;
    attributeName: string;
    attributeValue: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface IProductSKUAttributeValueDomain extends IDomain, IProductSKUAttributeValue {
}

export * from './product-sku-attribute-value.domain';
