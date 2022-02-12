import { CHANNEL_OUTPUT } from "../../../const";
import { IChannelDomain } from "../../../domain";
import { constructorProvide } from "../../../infrastructure/ioc";
import { FindByIdOutput, IFindByIdOutput } from "../base";

export interface IFindChannelByIdOutput extends IFindByIdOutput<IChannelDomain> { }

@constructorProvide(CHANNEL_OUTPUT.FIND_BY_ID)
export class FindChannelByIdOutput extends FindByIdOutput<IChannelDomain> implements IFindChannelByIdOutput {
    constructor(output: IFindChannelByIdOutput) {
        super(output)
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