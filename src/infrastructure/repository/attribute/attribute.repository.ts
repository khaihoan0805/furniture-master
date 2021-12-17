import { API_DOMAIN, NAMES, TYPES } from "../../../const";
import { AttributeDomain, IAttributeDomain } from "../../../domain";
import { DatabaseModel, IDatabase } from "../../database";
import { namedInject, singletonNamedProvide } from "../../ioc";
import { BasePostgresRepository, IDataMapper, IRepository } from "../base";
import { IAttributeMapper } from "./attribute.mapper";

export interface IAttributeRepository extends IRepository<IAttributeDomain> {}

@singletonNamedProvide(TYPES.REPOSITORY, API_DOMAIN.ATTRIBUTE)
export class AttributeRepository extends BasePostgresRepository<IAttributeDomain> implements IAttributeRepository {
    model: DatabaseModel<IAttributeDomain>;
    
    @namedInject(TYPES.MAPPER, API_DOMAIN.ATTRIBUTE)
    protected mapper: IAttributeMapper;

    constructor(
        @namedInject(TYPES.DATABASE, NAMES.POSTGRES)
        protected database: IDatabase
    ) {
        super(database)

        this.model = this.postgresDatabase.dbModels.attribute;
    }
}