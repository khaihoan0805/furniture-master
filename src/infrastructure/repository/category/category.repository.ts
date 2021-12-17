import { API_DOMAIN, NAMES, TYPES } from "../../../const";
import { CategoryDomain, ICategoryDomain } from "../../../domain";
import { DatabaseModel, IDatabase } from "../../database";
import { namedInject, singletonNamedProvide } from "../../ioc";
import { BasePostgresRepository, IRepository } from "../base";
import { ICategoryMapper } from "./category.mapper";

export interface ICategoryRepository extends IRepository<ICategoryDomain> {}

@singletonNamedProvide(TYPES.REPOSITORY, API_DOMAIN.CATEGORY)
export class CategoryRepository extends BasePostgresRepository<ICategoryDomain> implements ICategoryRepository {
    model: DatabaseModel<ICategoryDomain>

    @namedInject(TYPES.MAPPER, API_DOMAIN.CATEGORY)
    protected mapper: ICategoryMapper;

    constructor(
        @namedInject(TYPES.DATABASE, NAMES.POSTGRES)
        protected database: IDatabase
    ) {
        super(database)

        this.model = this.postgresDatabase.dbModels.category;
    }
}