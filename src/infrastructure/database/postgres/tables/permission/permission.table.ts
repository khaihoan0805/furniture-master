import { ModelOptions } from 'sequelize/types';
import { DatabaseDataTypes, DatabaseModelAttributes, ModelInstance } from '../../..';
import { API_DOMAIN, DATABASE, MODEL, TABLE, TYPES } from '../../../../../const';
import { IPermissionDomain, PermissionDomain } from '../../../../../domain';
import { singletonNamedProvide } from '../../../../ioc';
import { BasePostgresTable } from '../base';

export interface IPermissionInstance extends ModelInstance<IPermissionDomain> {}

@singletonNamedProvide(TYPES.DATABASE, API_DOMAIN.PERMISSION)
export class PermissionModel extends BasePostgresTable<IPermissionDomain, IPermissionInstance> {
    get attributes() {
        const attributes: DatabaseModelAttributes<IPermissionInstance> = {
            id: {
                type: DatabaseDataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                field: 'permission_id'
            },
            name: {
                type: DatabaseDataTypes.STRING,
                allowNull: false,
                field: 'name'
            }
        }

        return attributes;
    }

    get modelName() {
        return MODEL.PERMISSION;
    }

    get options() {
        const options: ModelOptions = {
            tableName: TABLE.PERMISSION
        }

        return options
    }
}