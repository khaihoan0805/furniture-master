import { API_DOMAIN, NAMES, TYPES } from "../../../const";
import { IProductAttributeDomain, ProductAttributeDomain } from "../../../domain";
import { DatabaseModel, IDatabase } from "../../database";
import { namedInject, singletonNamedProvide } from "../../ioc";
import { BasePostgresRepository, IRepository } from "../base";
import { IProductAttributeMapper } from "./product-attribute.mapper";

export interface IProductAttributeRepository extends IRepository<IProductAttributeDomain> {}

@singletonNamedProvide(TYPES.REPOSITORY, API_DOMAIN.PRODUCT_ATTRIBUTE)
export class ProductAttributeRepository extends BasePostgresRepository<IProductAttributeDomain> implements IProductAttributeRepository {
    model: DatabaseModel<IProductAttributeDomain>

    @namedInject(TYPES.MAPPER, API_DOMAIN.PRODUCT_ATTRIBUTE)
    protected mapper: IProductAttributeMapper;

    constructor(
        @namedInject(TYPES.DATABASE, NAMES.POSTGRES)
        protected database: IDatabase
    ) {
        super(database)

        this.model = this.postgresDatabase.dbModels.productAttribute;
    }
}