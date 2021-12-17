import { Request } from "express";
import { CONTROLLER, TYPES, USER_INPUT, USER_OUTPUT, USER_USECASE } from "../../../const";
import { ControllerResult } from "../../../infrastructure";
import { BaseController } from "../../../infrastructure/base";
import { inject, interfaces, namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { ICreateUserUsecase } from "../../../usecase";
import { ICreateUserInput } from "../../input";
import { ICreateUserOutput } from "../../output";

export interface IuserController {
    createUser(req: Request): Promise<ControllerResult>
}

@singletonNamedProvide(TYPES.CONTROLLER, CONTROLLER.USER)
export class UserController extends BaseController implements IuserController {
    get id() {
        return CONTROLLER.USER;
    }

    @namedInject(TYPES.USECASE, USER_USECASE.CREATE)
    protected createUserUsecase: ICreateUserUsecase;

    @inject(USER_INPUT.CREATE)
    protected createUserInput: interfaces.Newable<ICreateUserInput>;
    @inject(USER_OUTPUT.CREATE)
    protected createUserOutput: interfaces.Newable<ICreateUserOutput>;

    async createUser(req: Request): Promise<ControllerResult> {
        const input = new this.createUserInput(req)

        const output = new this.createUserOutput(await this.createUserUsecase.execute(input));

        return { content: output.response }
    }
}