import { IDomain } from "../../infrastructure/base/domain";

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isSuperAdmin: boolean;
    status: number;
    createdBy: number;
    createdAt: Date;
    updatedBy: number;
    updatedAt: Date
}

export interface IUserDomain extends IUser, IDomain {}

export * from './user.domain';
