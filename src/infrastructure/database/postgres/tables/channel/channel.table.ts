import { DatabaseDataTypes, DatabaseModelAttributes, ModelInstance, ModelOptions } from "../../..";
import { API_DOMAIN, MODEL, TABLE, TYPES } from "../../../../../const";
import { IChannelDomain } from "../../../../../domain";
import { singletonNamedProvide } from "../../../../ioc";
import { BasePostgresTable } from "../base";

export interface IChannelInstance extends ModelInstance<IChannelDomain> {}

@singletonNamedProvide(TYPES.DATABASE, API_DOMAIN.CHANNEL)
export class ChannelModel extends BasePostgresTable<IChannelDomain, IChannelInstance> {
    get attributes() {
        const attributes: DatabaseModelAttributes<IChannelInstance> = {
            id: {
                type: DatabaseDataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                field: 'customer_id'
            },
            name: {
                type: DatabaseDataTypes.STRING,
                allowNull: false,
                field: 'email'
            },
            createdAt: {
                type: DatabaseDataTypes.DATE,
                allowNull: false,
                field: 'created_at'
            },
            createdBy: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: true,
                field: 'created_by'
            },
            updatedAt: {
                type: DatabaseDataTypes.DATE,
                allowNull: false,
                field: 'updated_at'
            },
            updatedBy: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: true,
                field: 'updated_by'
            }
        }

        return attributes;
    }

    get modelName() {
        return MODEL.CHANNEL;
    }

    get options() {
        const options: ModelOptions = {
            tableName: TABLE.CHANNEL
        }

        return options;
    }
}