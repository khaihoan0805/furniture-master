import { CHANNEL_OUTPUT } from "../../../const";
import { IChannelDomain } from "../../../domain";
import { constructorProvide } from "../../../infrastructure/ioc";
import { IUpdateOutput, UpdateOutput } from "../base";

export interface IUpdateChannelOutput extends IUpdateOutput<IChannelDomain> { }

@constructorProvide(CHANNEL_OUTPUT.UPDATE)
export class UpdateChannelOutput extends UpdateOutput<IChannelDomain> implements IUpdateChannelOutput {
    constructor(output: IUpdateChannelOutput) {
        super(output)
    }

    get response() {
        const { message } = this;

        return { message }
    }
}