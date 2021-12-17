import { DatabaseDataTypes, DatabaseModelAttributes, ModelInstance, ModelOptions } from '../../..';
import { API_DOMAIN, DATABASE, MODEL, TABLE, TYPES } from '../../../../../const';
import { AttributeDomain, IAttributeDomain } from '../../../../../domain';
import { singletonNamedProvide } from '../../../../ioc';
import { BasePostgresTable } from '../base';

export interface IAttributeInstance extends ModelInstance<IAttributeDomain> {}

@singletonNamedProvide(TYPES.DATABASE, API_DOMAIN.ATTRIBUTE)
export class AttributeModel extends BasePostgresTable<IAttributeDomain, IAttributeInstance> {
    get attributes() {
        const attributes: DatabaseModelAttributes<IAttributeInstance> = {
            id: {
                type: DatabaseDataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: 'attribute_id'
            },
            name: {
                type: DatabaseDataTypes.STRING,
                allowNull: false,
                field: 'attribute_name'
            },
            status: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'attribute_status'
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
        return MODEL.ATTRIBUTE;
    }

    get options() {
        const options: ModelOptions = {
            tableName: TABLE.ATTRIBUTE
        }

        return options
    }
}