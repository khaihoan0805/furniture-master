import { IDomain } from "../../infrastructure/base/domain";

export interface IProductImage {
    productId: number;
    imageId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface IProductImageDomain extends IDomain, IProductImage {}

export * from './product-image.domain';