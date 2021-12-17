import { DatabaseModel, IDatabase } from "../..";
import { API_DOMAIN, NAMES, TYPES } from "../../../const";
import { IProductSKUDomain } from "../../../domain";
import { namedInject, singletonNamedProvide } from "../../ioc";
import { BasePostgresRepository, IRepository } from "../base";
import { IProductSKUMapper } from "./product-sku.mapper";

export interface IProductSKURepository extends IRepository<IProductSKUDomain> {}

@singletonNamedProvide(TYPES.REPOSITORY, API_DOMAIN.PRODUCT_SKU)
export class ProductSKURepository extends BasePostgresRepository<IProductSKUDomain> implements IProductSKURepository {
    model: DatabaseModel<IProductSKUDomain>

    @namedInject(TYPES.MAPPER, API_DOMAIN.PRODUCT_SKU)
    protected mapper: IProductSKUMapper;

    constructor(
        @namedInject(TYPES.DATABASE, NAMES.POSTGRES)
        protected database: IDatabase
    ) {
        super(database)

        this.model = this.postgresDatabase.dbModels.productSKU;
    }
}