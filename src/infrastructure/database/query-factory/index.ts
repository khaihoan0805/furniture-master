import { DatabaseModel } from '../index';
import { 
    BulkCreateQuery, 
    BulkDeleteQuery, 
    BulkUpdateQuery, 
    DeleteByIdQuery, 
    FindByIdQuery, 
    FindQuery, 
    IsExistQuery, 
    PaginateQuery, 
    UpdateByIdQuery, 
    UpdateQuery,
    CreateQuery,
    CountQuery
} from './queries';


export * from './query';

export interface IQueryFactory {
    createFindQuery(model: DatabaseModel): FindQuery;
    createFindByIdQuery(model: DatabaseModel): FindByIdQuery;
    createCreateQuery(model: DatabaseModel): CreateQuery;
    createUpdateQuery(model: DatabaseModel): UpdateQuery;
    createUpdateByIdQuery(model: DatabaseModel): UpdateByIdQuery; 
    createDeleteByIdQuery(model: DatabaseModel): DeleteByIdQuery; 
    createBulkCreateQuery(model: DatabaseModel): BulkCreateQuery;
    createBulkDeleteQuery(model: DatabaseModel): BulkDeleteQuery;
    createBulkUpdateQuery(model: DatabaseModel): BulkUpdateQuery;
    createCountQuery(model: DatabaseModel): CountQuery;
    createPaginateQuery(model: DatabaseModel): PaginateQuery;
    createIsExistedQuery(model: DatabaseModel): IsExistQuery;
}

export * from './queries';
export * from './query-factory';