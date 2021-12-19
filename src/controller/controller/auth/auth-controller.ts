import { Request } from "express";
import { AUTH_INPUT, AUTH_OUTPUT, AUTH_USECASE, CONTROLLER, TYPES } from "../../../const";
import { ControllerResult } from "../../../infrastructure";
import { BaseController } from "../../../infrastructure/base";
import { inject, interfaces, namedInject, singletonNamedProvide, singletonProvide } from "../../../infrastructure/ioc";
import { ISignInUsecase } from "../../../usecase";
import { ISignInInput } from "../../input";
import { ISignInOutput } from "../../output/auth";

export interface IAuthController {
    signIn(req: Request): Promise<ControllerResult>
}

@singletonNamedProvide(TYPES.CONTROLLER, CONTROLLER.AUTH)
export class AuthController extends BaseController implements IAuthController {
    get id() {
        return CONTROLLER.AUTH
    }

    @namedInject(TYPES.USECASE, AUTH_USECASE.SIGN_IN)
    protected signInUsecase: ISignInUsecase;

    @inject(AUTH_INPUT.SIGN_IN)
    protected signInInput: interfaces.Newable<ISignInInput>;
    @inject(AUTH_OUTPUT.SIGN_IN)
    protected signInOutput: interfaces.Newable<ISignInOutput>;

    public async signIn(req: Request): Promise<ControllerResult> {
        const input = new this.signInInput(req);

        const output = new this.signInOutput(await this.signInUsecase.execute(input))

        return { content: output.response }
    }
}