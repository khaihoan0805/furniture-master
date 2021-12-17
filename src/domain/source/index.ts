import { IDomain } from "../../infrastructure/base/domain";

export interface ISource {
    channelId: number;
    customerId: number;
    name: string;
    sourceUrl: string;
    sourceId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ISourceDomain extends IDomain, ISource {}

export * from './source.domain';