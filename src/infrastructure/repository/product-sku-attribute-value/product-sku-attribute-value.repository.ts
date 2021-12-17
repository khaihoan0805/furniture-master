import { DatabaseModel, IDatabase } from "../..";
import { TYPES, API_DOMAIN, NAMES } from "../../../const";
import { IProductSKUAttributeValueDomain } from "../../../domain";
import { namedInject, singletonNamedProvide } from "../../ioc";
import { BasePostgresRepository, IRepository } from "../base";
import { IProductSKUAttributeValueMapper } from "./product-sku-attribute-value.mapper";

export interface IProductSKUAttributeValueRepository extends IRepository<IProductSKUAttributeValueDomain> {}

@singletonNamedProvide(TYPES.REPOSITORY, API_DOMAIN.PRODUCT_SKU_ATTRIBUTE_VALUE)
export class ProductSKUAttributeValueRepository extends BasePostgresRepository<IProductSKUAttributeValueDomain> implements IProductSKUAttributeValueRepository {
    model: DatabaseModel<IProductSKUAttributeValueDomain>

    @namedInject(TYPES.MAPPER, API_DOMAIN.PRODUCT_SKU_ATTRIBUTE_VALUE)
    protected mapper: IProductSKUAttributeValueMapper;

    constructor(
        @namedInject(TYPES.DATABASE, NAMES.POSTGRES)
        protected database: IDatabase
    ) {
        super(database)

        this.model = this.postgresDatabase.dbModels.productSKUAttributeValue;
    }
}