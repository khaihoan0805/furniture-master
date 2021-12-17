import { DatabaseDataTypes, DatabaseModelAttributes, ModelInstance, ModelOptions } from '../../..';
import { API_DOMAIN, DATABASE, MODEL, TABLE, TYPES } from '../../../../../const';
import { ISourceDomain, SourceDomain } from '../../../../../domain';
import { singletonNamedProvide } from '../../../../ioc';
import { BasePostgresTable } from '../base';

export interface ISourceInstance extends ModelInstance<ISourceDomain> {}

@singletonNamedProvide(TYPES.DATABASE, API_DOMAIN.SOURCE)
export class SourceModel extends BasePostgresTable<ISourceDomain, ISourceInstance> {
    get attributes() {
        const attributes: DatabaseModelAttributes<ISourceInstance> = {
            id: {
                type: DatabaseDataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                field: 'source_id'
            },
            channelId: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'channel_id'
            },
            customerId: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'customer_id'
            },
            name: {
                type: DatabaseDataTypes.STRING,
                allowNull: false,
                field: 'name'
            },
            sourceUrl: {
                type: DatabaseDataTypes.STRING,
                allowNull: false,
                field: 'source_url'
            },
            sourceId: {
                type: DatabaseDataTypes.STRING,
                allowNull: false,
                field: 'source_id'
            },
            createdAt: {
                type: DatabaseDataTypes.DATE,
                allowNull: false,
                field: 'created_at'
            },
            updatedAt: {
                type: DatabaseDataTypes.DATE,
                allowNull: false,
                field: 'updated_at'
            }
        }
        
        return attributes;
    }

    get modelName() {
        return MODEL.SOURCE;
    }

    get options() {
        const options: ModelOptions = {
            tableName: TABLE.SOURCE
        }

        return options
    }
}