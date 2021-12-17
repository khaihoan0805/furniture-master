import { IDomain } from "../../infrastructure/base/domain";
import { ICategoryDomain } from "../category";
import { IProductDomain } from "../product";

export interface IProductCategory {
    productId: number | IProductDomain;
    categoryId: number | ICategoryDomain;
    status: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface IProductCategoryDomain extends IDomain, IProductCategory {}

export * from './product-category.domain';