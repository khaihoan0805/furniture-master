import {
    Sequelize as DatabaseConnection,
    Transaction,
    WhereOptions,
    IncludeOptions,
    FindOptions,
    ModelAttributes as DatabaseModelAttributes,
    Model,
    ModelOptions,
    ModelCtor,
    Optional
} from 'sequelize';

import * as Sequelize from 'sequelize';
// import { Query } from './queries/query';

export type PaginateResult<TEntity = any> = {
    docs: TEntity[];
    total: number;
    limit: number;
    offset: number;
};


const DatabaseDataTypes = {
    ABSTRACT: Sequelize.ABSTRACT,
    STRING: Sequelize.STRING,
    CHAR: Sequelize.CHAR,
    TEXT: Sequelize.TEXT,
    NUMBER: Sequelize.NUMBER,
    TINYINT: Sequelize.TINYINT,
    SMALLINT: Sequelize.SMALLINT,
    MEDIUMINT: Sequelize.MEDIUMINT,
    INTEGER: Sequelize.INTEGER,
    BIGINT: Sequelize.BIGINT,
    FLOAT: Sequelize.FLOAT,
    TIME: Sequelize.TIME,
    DATE: Sequelize.DATE,
    DATEONLY: Sequelize.DATEONLY,
    BOOLEAN: Sequelize.BOOLEAN,
    NOW: Sequelize.NOW,
    BLOB: Sequelize.BLOB,
    DECIMAL: Sequelize.DECIMAL,
    UUID: Sequelize.UUID,
    UUIDV1: Sequelize.UUIDV1,
    UUIDV4: Sequelize.UUIDV4,
    HSTORE: Sequelize.HSTORE,
    JSON: Sequelize.JSON,
    JSONB: Sequelize.JSONB,
    VIRTUAL: Sequelize.VIRTUAL,
    ARRAY: Sequelize.ARRAY,
    ENUM: Sequelize.ENUM,
    RANGE: Sequelize.RANGE,
    REAL: Sequelize.REAL,
    DOUBLE: Sequelize.DOUBLE,
    GEOMETRY: Sequelize.GEOMETRY
};

// Db models according to Sequelize / typescript
type ModelExtends<TEntity = any> = {
    paginate: (query: any) => Promise<PaginateResult<TEntity>>;
};

type ModelCreationAttributes<TEntity = any> = Optional<TEntity, keyof TEntity>

interface ModelInstance<TEntity = any> extends Model<TEntity, ModelCreationAttributes<TEntity>> {}

type DatabaseModel<TEntity = any> = ModelCtor<Model<TEntity>> & ModelExtends<TEntity>


export {
    DatabaseConnection,
    DatabaseDataTypes,
    Transaction,
    WhereOptions,
    IncludeOptions,
    FindOptions,
    DatabaseModelAttributes,
    ModelInstance,
    ModelOptions,
    DatabaseModel,
    ModelExtends
};

export type DatabaseModels = {
    user?: DatabaseModel,
    role?: DatabaseModel,
    permission?: DatabaseModel,
    product?: DatabaseModel,
    category?: DatabaseModel,
    attribute?:DatabaseModel,
    attributeValue?: DatabaseModel,
    productAttribute?: DatabaseModel,
    productCategory?: DatabaseModel,
    customer?: DatabaseModel,
    metadata?: DatabaseModel,
    order?:DatabaseModel,
    orderItem?: DatabaseModel,
    productImage?: DatabaseModel,
    source?: DatabaseModel,
    image?: DatabaseModel,
    productSKU?: DatabaseModel,
    productSKUAttributeValue?: DatabaseModel,
    channel?: DatabaseModel
};

export * from './query-builder';
export * from './query-factory';
export * from './query-parser';
export * from './postgres';
