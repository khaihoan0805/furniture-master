import { AUTH_OUTPUT } from "../../../const";
import { BaseHttpOutput, IBaseHttpOutput } from "../../../infrastructure/base";
import { constructorProvide } from "../../../infrastructure/ioc";

export interface ISignInOutput extends IBaseHttpOutput {
    message: string;
    token: string;
}

@constructorProvide(AUTH_OUTPUT.SIGN_IN)
export class SignInOutput extends BaseHttpOutput<ISignInOutput> implements ISignInOutput {
    constructor(output: ISignInOutput) {
        super(output)
    }

    get token() {
        return this.output.token;
    }

    get message() {
        return this.output.message;
    }

    get response() {
        const {
            message,
            token
        } = this;

        return {
            message,
            token
        }
    }
}

