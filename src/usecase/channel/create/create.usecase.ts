import { API_DOMAIN, CHANNEL_USECASE, TYPES } from "../../../const";
import { ICreateChannelInput } from "../../../controller/input/channel";
import { ICreateChannelOutput } from "../../../controller/output/channel/create.output";
import { IChannelDomain } from "../../../domain";
import { IChannelRepository, Operators } from "../../../infrastructure";
import { namedInject, singletonNamedProvide } from "../../../infrastructure/ioc";
import { CreateUsecase, ICreateUsecase } from "../../base";

export interface ICreateChannelUsecase extends ICreateUsecase<IChannelDomain, ICreateChannelInput, ICreateChannelOutput> { }

@singletonNamedProvide(TYPES.USECASE, CHANNEL_USECASE.CREATE)
export class CreateChannelUsecase extends CreateUsecase<IChannelDomain, ICreateChannelInput, ICreateChannelOutput> implements ICreateChannelUsecase {
    get DOMAIN() {
        return API_DOMAIN.CHANNEL;
    }

    get id() {
        return CHANNEL_USECASE.CREATE
    }

    constructor(
        @namedInject(TYPES.REPOSITORY, API_DOMAIN.CHANNEL)
        protected repository: IChannelRepository
    ) {
        super(repository)
    }

    async validate(entity: IChannelDomain): Promise<void> {
        this.log.info(`pass here`)
        const isExisted = await this.repository.find({
            filters: [
                { code: 'name', operator: Operators.Equals, value: entity.name }
            ]
        })

        if (isExisted.length > 0) {
            throw this.errorFactory.badRequestError(`This channel name ${entity.name} is already existed.`)
        }
    }

    async execute(input: ICreateChannelInput): Promise<ICreateChannelOutput> {
        return super.execute(input);
    }
}