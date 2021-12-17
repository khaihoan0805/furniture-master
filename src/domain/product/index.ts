import { IDomain } from "../../infrastructure/base/domain";
import { IAttributeDomain } from "../attribute";
import { ICategoryDomain } from "../category";
import { IProductSKUDomain } from "../product-sku";

export interface IProduct {
    image: string;
    name: string;
    status: number;
    slug: string;
    description: string;
    attributes: (IAttributeDomain | number)[];
    categories: (ICategoryDomain | number)[];
    skus: (IProductSKUDomain | null)[] | number[];
    createdBy: number;
    createdAt: Date;
    updatedBy: number;
    updatedAt: Date
}

export interface IProductDomain extends IDomain, IProduct { }

export * from './product.domain';