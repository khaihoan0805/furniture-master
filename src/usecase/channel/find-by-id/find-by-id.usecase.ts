import { API_DOMAIN, CHANNEL_USECASE, TYPES } from "../../../const";
import { IFindChannelByIdInput, IFindChannelByIdOutput } from "../../../controller";
import { IChannelDomain } from "../../../domain";
import { IChannelRepository } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { FindByIdUsecase, IFindByIdUsecase } from "../../base";

export interface IFindChannelByIdUsecase extends IFindByIdUsecase<IChannelDomain, IFindChannelByIdInput, IFindChannelByIdOutput> { }

@singletonNamedProvide(TYPES.USECASE, CHANNEL_USECASE.FIND_BY_ID)
export class FindChannelByIdUsecase extends FindByIdUsecase<IChannelDomain, IFindChannelByIdInput, IFindChannelByIdOutput> {
    get DOMAIN() {
        return API_DOMAIN.CHANNEL;
    }

    get id() {
        return CHANNEL_USECASE.FIND_BY_ID;
    }

    constructor(
        @namedInject(TYPES.REPOSITORY, API_DOMAIN.CHANNEL)
        repository: IChannelRepository
    ) {
        super(repository)
    }

    public async execute(input: IFindChannelByIdInput): Promise<IFindChannelByIdOutput> {
        return super.execute(input)
    }
}