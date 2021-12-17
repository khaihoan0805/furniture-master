import { ModelOptions } from 'sequelize/types'
import { DatabaseConnection, DatabaseModel, DatabaseModelAttributes, ModelInstance } from '../../../index'
import { paginate } from '../../../query-factory/queries/plugins'
import { injectable } from '../../../../ioc';
import { IDomain } from '../../../../base/domain';


export interface IBasePostgresTable<M extends IDomain, I extends ModelInstance<M>> {
    define(connection: DatabaseConnection): DatabaseModel<M>
}

@injectable()
export abstract class BasePostgresTable<M extends IDomain, I extends ModelInstance<M>> {
    public model: DatabaseModel<M>

    abstract attributes: DatabaseModelAttributes<I>
    abstract options: ModelOptions;
    abstract modelName: string;

    define(connection: DatabaseConnection) {
        this.model = connection.define(this.modelName, this.attributes, this.options) as any
        this.model.paginate = paginate

        return this.model
    }
}