import { Request } from "express";
import { CHANNEL_INPUT, CHANNEL_OUTPUT, CHANNEL_USECASE, CONTROLLER, TYPES } from "../../../const";
import { ControllerResult } from "../../../infrastructure";
import { BaseController } from "../../../infrastructure/base";
import { inject, interfaces, namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { ICreateChannelUsecase } from "../../../usecase";
import { ICreateChannelInput } from "../../input";
import { ICreateChannelOutput } from "../../output";

export interface IChannelController {
    createChannel(req: Request): Promise<ControllerResult>
}

@singletonNamedProvide(TYPES.CONTROLLER, CONTROLLER.CHANNEL)
export class ChannelController extends BaseController implements IChannelController {
    get id() {
        return CONTROLLER.CHANNEL;
    }

    @namedInject(TYPES.USECASE, CHANNEL_USECASE.CREATE)
    protected createChannelUsecase: ICreateChannelUsecase;

    @inject(CHANNEL_INPUT.CREATE)
    protected createChannelInput: interfaces.Newable<ICreateChannelInput>;
    @inject(CHANNEL_OUTPUT.CREATE)
    protected createChannelOutput: interfaces.Newable<ICreateChannelOutput>;

    async createChannel(req: Request): Promise<ControllerResult> {
        const input = new this.createChannelInput(req)

        const output = new this.createChannelOutput(await this.createChannelUsecase.execute(input));

        return { content: output.response }
    }
}