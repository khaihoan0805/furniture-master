import { IDomain } from "../../infrastructure/base/domain";

export interface IMetadata {
    productId: number;
    desciption: string;
    metaKeyword: string;
    metaDesciption: string;
    metaImage: string;
    canonical: string;
    metaUrl: string;
    metaTitle: string;
    metaType: string;
    createdBy: number;
    createdAt: Date;
    updatedBy: number;
    updatedAt: Date;
}

export interface IMetadataDomain extends IDomain, IMetadata {}

export * from './metadata.domain';

