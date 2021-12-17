import { Request } from "express";
import { AUTH_INPUT } from "../../../const";
import { BaseHttpInput, IBaseHttpInput } from "../../../infrastructure/base";
import { constructorProvide } from "../../../infrastructure/ioc";

export interface ISignInInput extends IBaseHttpInput {
    email: string;
    password: string;
}

@constructorProvide(AUTH_INPUT.SIGN_IN)
export class SignInInput extends BaseHttpInput<ISignInInput> implements ISignInInput {
    constructor(req: Request) {
        super(req)
    }

    get email() {
        return this.input.email;
    }

    get password() {
        return this.input.password;
    }
}