import { DatabaseModel, IDatabase } from "../..";
import { API_DOMAIN, NAMES, TYPES } from "../../../const";
import { IAttributeValueDomain } from "../../../domain";
import { namedInject, singletonNamedProvide } from "../../ioc";
import { BasePostgresRepository, IRepository } from "../base";
import { IAttributeValueMapper } from "./attribute-value.mapper";

export interface IAttributeValueRepository extends IRepository<IAttributeValueDomain> { }

@singletonNamedProvide(TYPES.REPOSITORY, API_DOMAIN.ATTRIBUTE_VALUE)
export class AttributeValueRepository extends BasePostgresRepository<IAttributeValueDomain> implements IAttributeValueRepository {
    model: DatabaseModel<IAttributeValueDomain>

    @namedInject(TYPES.MAPPER, API_DOMAIN.ATTRIBUTE_VALUE)
    protected mapper: IAttributeValueMapper;

    constructor(
        @namedInject(TYPES.DATABASE, NAMES.POSTGRES)
        protected database: IDatabase
    ) {
        super(database)

        this.model = this.postgresDatabase.dbModels.attributeValue;
    }
} 