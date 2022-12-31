import { IDomain } from "../../infrastructure/base/domain";
import { IAttributeDomain } from "../attribute";
import { ICategoryDomain } from "../category";

export interface IProduct {
    image: string;
    name: string;
    status: number;
    slug: string;
    description: string;
    attributes: (IAttributeDomain | number)[];
    categories: (ICategoryDomain | number)[];
    createdBy: number;
    createdAt: Date;
    updatedBy: number;
    updatedAt: Date
}

export interface IProductDomain extends IDomain, IProduct { }

export * from './product.domain';