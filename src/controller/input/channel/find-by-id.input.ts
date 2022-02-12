import { CHANNEL_INPUT } from "../../../const";
import { constructorProvide } from "../../../infrastructure/ioc";
import { FindByIdInput, IFindByIdInput } from "../base";

export interface IFindChannelByIdInput extends IFindByIdInput { }

@constructorProvide(CHANNEL_INPUT.FIND_BY_ID)
export class FindChannelByIdInput extends FindByIdInput<IFindChannelByIdInput> implements IFindChannelByIdInput {
    constructor(req) {
        super(req);
    }

    get id(): number {
        return this.input.id;
    }
}