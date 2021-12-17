import { Criteria, Operators, PaginateResult } from "../index";
import { IDomain } from "../../base/domain";
import { DatabaseModel, IDatabase, IQueryFactory } from "../../database";
import { Context } from "../../service/context-service";
import { IDataMapper } from "./base.mapper";
import { inject, injectable, namedInject } from '../../ioc';
import { NAMES, TYPES } from "../../../const";
import { IErrorFactory } from "../../error";
import { IArrayHelper } from "../../utils";
import { Model } from "sequelize/types";

export interface IRepository<D> {
    paginate(criteria: Criteria): Promise<PaginateResult<D>>;
    find(criteria: Criteria): Promise<D[]>;
    findById(id: number, criteria?: Criteria): Promise<D>;
    create(entity: D, options?: { include?: any }): Promise<D>;
    update(data: any, criteria?: Criteria): Promise<D>;
    updateById(id: number, entity: D): Promise<D>;
    deleteById(id: number): Promise<undefined>;
    bulkCreate(entities: D[]): Promise<D[]>;
    bulkUpdate(criteria: Criteria, entities: D[]): Promise<void>;
    bulkDelete(criteria: Criteria): Promise<void>;
    count(criteria: Criteria): Promise<number>;
    isExist(id: number): Promise<boolean>;
}

@injectable()
export abstract class BasePostgresRepository<D extends IDomain> implements IRepository<D> {

    protected abstract model: DatabaseModel<D>;
    protected abstract mapper: IDataMapper<D>;
    protected context: Context;

    @inject(TYPES.ERROR_FACTORY)
    protected errorFactory: IErrorFactory;

    @inject(TYPES.QUERY_FACTORY)
    protected queryFactory: IQueryFactory;

    @inject(TYPES.ARRAY_HELPER)
    protected arrayHelper: IArrayHelper;

    constructor(
        protected postgresDatabase: IDatabase
    ) {}

    async paginate(criteria: Criteria): Promise<PaginateResult<D>> {
        const paginateQuery = this.queryFactory.createPaginateQuery(this.model)

        const result = await paginateQuery.execute(criteria)

        result.docs = result.docs.map(doc => { return this.mapper.toEntity(doc) })

        return result;
    }

    public async find(criteria: Criteria): Promise<D[]> {
        const findQuery = this.queryFactory.createFindQuery(this.model)

        const docs = await findQuery.execute(criteria)

        return docs.map(doc => this.mapper.toEntity(doc))
    }

    public async findById(id: number, criteria?: Criteria): Promise<D> {
        try {
            const findByIdQuery = this.queryFactory.createFindByIdQuery(this.model)

            const doc = await findByIdQuery.execute(id, criteria)

            return doc ? this.mapper.toEntity(doc) : undefined
        }
        catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw this.errorFactory.badRequestError(error.errors[0].message, error.fields)

            }
            throw error
        }
    }

    public async create(entity: D, options?: { include?: any; }): Promise<D> {
        try {
            const createQuery = this.queryFactory.createCreateQuery(this.model)

            const mapped = this.mapper.toDatabase(entity)

            const doc = await createQuery.execute(mapped, options)

            return this.mapper.toEntity(doc)
        }
        catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw this.errorFactory.badRequestError(error.errors[0].message, error.fields)

            }
            throw error
        }
    }

    public async update(data: any, criteria?: Criteria): Promise<D> {
        try {
            const updateQuery = this.queryFactory.createUpdateQuery(this.model)

            const doc = await updateQuery.execute(criteria, this.mapper.toDatabase(data))

            return <D>this.mapper.toEntity(doc)
        }
        catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw this.errorFactory.badRequestError(error.errors[0].message, error.fields)

            }
            throw error
        }
    }

    public async updateById(id: number, entity: D): Promise<D> {
        try {
            const updateByIdQuery = this.queryFactory.createUpdateByIdQuery(this.model)

            const doc = await updateByIdQuery.execute(id, entity)

            return this.mapper.toEntity(doc)
        }
        catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw this.errorFactory.badRequestError(error.errors[0].message, error.fields)

            }
            throw error
        }
    }

    public async deleteById(id: number): Promise<undefined> {
        try {
            const deleteByIdQuery = this.queryFactory.createDeleteByIdQuery(this.model)

            await deleteByIdQuery.execute(id)

            return undefined
        }

        catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw this.errorFactory.badRequestError(error.errors[0].message, error.fields)

            }
            throw error
        }
    }

    public async bulkCreate(entities: D[]): Promise<D[]> {
        try {
            const bulkCreateQuery = this.queryFactory.createBulkCreateQuery(this.model)

            const docs = await bulkCreateQuery.execute(entities)

            return docs.map(doc => this.mapper.toEntity(doc))
        }
        catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw this.errorFactory.badRequestError(error.errors[0].message, error.fields)

            }
            throw error
        }
    }

    public async bulkUpdate(criteria: Criteria, entities: D[]): Promise<void> {
        try {
            const bulkUpdateQuery = this.queryFactory.createBulkUpdateQuery(this.model)

            const docs = await bulkUpdateQuery.execute(criteria, entities)

        }
        catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw this.errorFactory.badRequestError(error.errors[0].message, error.fields)

            }
            throw error
        }
    }

    public async bulkDelete(criteria: Criteria): Promise<void> {
        try {
            const bulkDeleteQuery = this.queryFactory.createBulkDeleteQuery(this.model)

            await bulkDeleteQuery.execute(criteria)

        }
        catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw this.errorFactory.badRequestError(error.errors[0].message, error.fields)

            }
            throw error
        }
    }


    public async count(criteria: Criteria): Promise<number> {
        try {
            const countQuery = this.queryFactory.createCountQuery(this.model)

            const doc = await countQuery.execute(criteria)

            return doc
        }
        catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw this.errorFactory.badRequestError(error.errors[0].message, error.fields)

            }
            throw error
        }
    }

    public async isExist(id: number): Promise<boolean> {
        try {
            const isExistQuery = this.queryFactory.createIsExistedQuery(this.model)

            const criteria: Criteria = {
                filters: [{
                    code: 'id',
                    operator: Operators.Equals,
                    value: id
                }]
            }

            return await isExistQuery.execute(criteria)
        }
        catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw this.errorFactory.badRequestError(error.errors[0].message, error.fields)

            }
            throw error
        }
    }
}