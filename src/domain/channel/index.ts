import { IDomain } from "../../infrastructure/base/domain";

export interface IChannel {
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IChannelDomain extends IDomain, IChannel {}

export * from './channel.domain';