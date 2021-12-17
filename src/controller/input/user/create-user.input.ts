import { Request } from "express";
import { USER_INPUT } from "../../../const";
import { IUser, UserDomain } from "../../../domain";
import { constructorProvide } from "../../../infrastructure/ioc";
import { CreateInput, ICreateInput } from "../base";

export interface ICreateUserInput extends ICreateInput, IUser {}

@constructorProvide(USER_INPUT.CREATE)
export class CreateUserInput extends CreateInput<ICreateUserInput> implements ICreateUserInput {
    constructor(req: Request) {
        super(req)
    }

    get firstName() {
        return this.input.firstName;
    }

    get lastName() {
        return this.input.lastName;
    }

    get email() {
        return this.input.email;
    }

    get password() {
        return this.input.password;
    }

    get isSuperAdmin() {
        return this.input.isSuperAdmin;
    }

    get status() {
        return this.input.status;
    }

    get createdAt() {
        return new Date();
    }

    get createdBy() {
        return 1;
    }

    get updatedAt() {
        return new Date();
    }

    get updatedBy() {
        return 1;
    }
}