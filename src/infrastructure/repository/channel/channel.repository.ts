import { API_DOMAIN, NAMES, TYPES } from "../../../const";
import { IChannelDomain } from "../../../domain";
import { DatabaseModel, IDatabase } from "../../database";
import { namedInject, singletonNamedProvide } from "../../ioc";
import { BasePostgresRepository, IRepository } from "../base";
import { IChannelMapper } from "./channel.mapper";

export interface IChannelRepository extends IRepository<IChannelDomain> { }

@singletonNamedProvide(TYPES.REPOSITORY, API_DOMAIN.CHANNEL)
export class ChannelRepository extends BasePostgresRepository<IChannelDomain> implements IChannelRepository {
    model: DatabaseModel<IChannelDomain>

    @namedInject(TYPES.MAPPER, API_DOMAIN.CHANNEL)
    protected mapper: IChannelMapper;

    constructor(
        @namedInject(TYPES.DATABASE, NAMES.POSTGRES)
        protected database: IDatabase
    ) {
        super(database)

        this.model = this.postgresDatabase.dbModels.channel;
    }
}