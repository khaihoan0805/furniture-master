import { IDomain } from "../../infrastructure/base/domain";

export interface ICategory {
    image?: string;
    name: string;
    status: string;
    description?: string;
    createdBy: number;
    createdAt: Date;
    updatedBy: number;
    updatedAt: Date
}

export interface ICategoryDomain extends IDomain, ICategory {}

export * from './category.domain';