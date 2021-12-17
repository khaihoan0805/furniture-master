import { Request } from "express";
import { AUTH_INPUT, AUTH_OUTPUT, AUTH_WORKFLOW, CONTROLLER, TYPES } from "../../../const";
import { ControllerResult } from "../../../infrastructure";
import { BaseController } from "../../../infrastructure/base";
import { inject, interfaces, namedInject, singletonNamedProvide, singletonProvide } from "../../../infrastructure/ioc";
import { ISignInWorkflow } from "../../../workflow";
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

    @namedInject(TYPES.WORKFLOW, AUTH_WORKFLOW.SIGN_IN)
    protected signInWorkflow: ISignInWorkflow;

    @inject(AUTH_INPUT.SIGN_IN)
    protected signInInput: interfaces.Newable<ISignInInput>;
    @inject(AUTH_OUTPUT.SIGN_IN)
    protected signInOutput: interfaces.Newable<ISignInOutput>;

    public async signIn(req: Request): Promise<ControllerResult> {
        const input = new this.signInInput(req);

        const output = new this.signInOutput(await this.signInWorkflow.execute(input))

        return { content: output.response }
    }
}