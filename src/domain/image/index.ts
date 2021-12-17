import { IDomain } from "../../infrastructure/base/domain";

export interface IImage {
    name: string;
    url: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export interface IImageDomain extends IDomain, IImage {}

export * from './image.domain';