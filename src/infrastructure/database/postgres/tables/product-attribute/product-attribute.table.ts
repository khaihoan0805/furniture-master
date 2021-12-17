import { ModelOptions } from 'sequelize/types';
import { DatabaseDataTypes, DatabaseModelAttributes, ModelInstance } from '../../..';
import { API_DOMAIN, DATABASE, MODEL, TABLE, TYPES } from '../../../../../const';
import { IProductAttributeDomain, ProductAttributeDomain } from '../../../../../domain';
import { singletonNamedProvide } from '../../../../ioc';
import { BasePostgresTable } from '../base';

export interface IProductAttributeInstance extends ModelInstance<IProductAttributeDomain> {}

@singletonNamedProvide(TYPES.DATABASE, API_DOMAIN.PRODUCT_ATTRIBUTE)
export class ProductAttributeModel extends BasePostgresTable<IProductAttributeDomain, IProductAttributeInstance> {
    get attributes() {
        const attributes: DatabaseModelAttributes<IProductAttributeInstance> = {
            id: {
                type: DatabaseDataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: 'product_attribute_id'
            },
            productId: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'product_id'
            },
            attributeId: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'attribute_id'
            },
            status: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'product_attribute_status'
            },
            createdAt: {
                type: DatabaseDataTypes.DATE,
                allowNull: false,
                field: 'created_at'
            },
            updatedAt:{
                type: DatabaseDataTypes.DATE,
                allowNull: false,
                field: 'updated_at'
            }
        }

        return attributes
    }

    get modelName() {
        return MODEL.PRODUCT_ATTRIBUTE;
    }

    get options() {
        const options: ModelOptions = {
            tableName: TABLE.PRODUCT_ATTRIBUTES
        }

        return options
    }
}