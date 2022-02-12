import { CHANNEL_OUTPUT } from "../../../const";
import { IChannelDomain } from "../../../domain";
import { constructorProvide } from "../../../infrastructure/ioc";
import { CreateOutput, ICreateOutput } from "../base";

export interface ICreateChannelOutput extends ICreateOutput<IChannelDomain> { }

@constructorProvide(CHANNEL_OUTPUT.CREATE)
export class CreateChannelOutput extends CreateOutput<IChannelDomain> implements ICreateChannelOutput {
    constructor(output: ICreateChannelOutput) {
        super(output);
    }

    get response() {
        const {
            message,
            entity
        } = this;

        return {
            message,
            entity
        }
    }
}