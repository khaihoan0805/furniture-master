import { IQueryFactory } from ".";
import { DatabaseModel } from "..";
import { TYPES } from "../../../const";
import { singletonProvide } from "../../ioc";
import { FindQuery, FindByIdQuery, UpdateQuery, UpdateByIdQuery, DeleteByIdQuery, BulkCreateQuery, BulkDeleteQuery, PaginateQuery, BulkUpdateQuery, CountQuery, IsExistQuery } from "./queries";
import { CreateQuery } from "./queries/create.query";


//Factory to create Query with context
@singletonProvide(TYPES.QUERY_FACTORY)
export default class QueryFactory implements IQueryFactory{
    public createFindQuery(model: DatabaseModel) {
        return new FindQuery(model)
    }

    public createFindByIdQuery(model: DatabaseModel): FindByIdQuery {
        return new FindByIdQuery(model)
    }

    public createPaginateQuery(model: DatabaseModel) {
        return new PaginateQuery(model)
    }

    public createCreateQuery(model: DatabaseModel) : CreateQuery {
        return new CreateQuery(model);
    }

    public createUpdateQuery(model: DatabaseModel) : UpdateQuery {
        return new UpdateQuery(model)
    }

    public createUpdateByIdQuery(model: DatabaseModel) {
        return new UpdateByIdQuery(model)
    }

    public createDeleteByIdQuery(model: DatabaseModel) {
        return new DeleteByIdQuery(model)
    }

    public createBulkCreateQuery(model: DatabaseModel) {
        return new BulkCreateQuery(model)
    }

    public createBulkDeleteQuery(model: DatabaseModel) {
        return new BulkDeleteQuery(model)
    }

    public createBulkUpdateQuery(model: DatabaseModel) {
        return new BulkUpdateQuery(model)
    }

    public createCountQuery(model: DatabaseModel) {
        return new CountQuery(model)
    }
    
    public createIsExistedQuery(model: DatabaseModel) {
        return new IsExistQuery(model)
    }
}