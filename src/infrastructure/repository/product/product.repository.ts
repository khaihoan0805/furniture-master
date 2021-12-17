import { API_DOMAIN, NAMES, TYPES } from "../../../const";
import { IProductDomain } from "../../../domain";
import { DatabaseModel, IDatabase } from "../../database";
import { namedInject, singletonNamedProvide } from "../../ioc";
import { BasePostgresRepository, IRepository } from "../base";
import { IProductMapper } from "./product.mapper";

export interface IProductRepository extends IRepository<IProductDomain> {}

@singletonNamedProvide(TYPES.REPOSITORY, API_DOMAIN.PRODUCT)
export class ProductRepository extends BasePostgresRepository<IProductDomain> implements IProductRepository {
    model: DatabaseModel<IProductDomain>

    @namedInject(TYPES.MAPPER, API_DOMAIN.PRODUCT)
    protected mapper: IProductMapper;

    constructor(
        @namedInject(TYPES.DATABASE, NAMES.POSTGRES)
        protected database: IDatabase
    ) {
        super(database)

        this.model = this.postgresDatabase.dbModels.product;
    }
}