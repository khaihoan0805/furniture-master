import { DatabaseDataTypes, DatabaseModelAttributes, ModelInstance, ModelOptions } from '../../..';
import { API_DOMAIN, DATABASE, MODEL, TABLE, TYPES } from '../../../../../const';
import { IProductDomain, ProductDomain } from '../../../../../domain';
import { singletonNamedProvide } from '../../../../ioc';
import { BasePostgresTable } from '../base';

export interface IProductInstance extends ModelInstance<IProductDomain> {}

@singletonNamedProvide(TYPES.DATABASE, API_DOMAIN.PRODUCT)
export class ProductModel extends BasePostgresTable<IProductDomain, IProductInstance> {
    get attributes() {
        const attributes: DatabaseModelAttributes<IProductInstance> = {
            id: {
                type: DatabaseDataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: 'product_id'
            },
            image: {
                type: DatabaseDataTypes.STRING,
                allowNull: true,
                field: 'product_image'
            },
            name: {
                type: DatabaseDataTypes.STRING,
                allowNull: true,
                field: 'product_name'
            },
            status: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'product_status'
            },
            slug: {
                type: DatabaseDataTypes.STRING,
                allowNull: false,
                field: 'product_slug'
            },
            description: {
                type: DatabaseDataTypes.STRING,
                allowNull: true,
                field: 'product_description'
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
        return MODEL.PRODUCT;
    }
    get options() {
        const options: ModelOptions = {
            tableName: TABLE.PRODUCT
        }

        return options
    }
}