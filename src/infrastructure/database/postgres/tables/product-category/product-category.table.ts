import { ModelOptions } from 'sequelize/types';
import { DatabaseDataTypes, DatabaseModelAttributes, ModelInstance } from '../../..';
import { API_DOMAIN, DATABASE, MODEL, TABLE, TYPES } from '../../../../../const';
import { IProductCategoryDomain } from '../../../../../domain';
import { ProductCategoryDomain } from '../../../../../domain/product-caterogy/product-category.domain';
import { singletonNamedProvide } from '../../../../ioc';
import { BasePostgresTable } from '../base';

export interface IProductCategoryInsance extends ModelInstance<IProductCategoryDomain> {}

@singletonNamedProvide(TYPES.DATABASE, API_DOMAIN.PRODUCT_CATEGORY)
export class ProductCategoryModel extends BasePostgresTable<IProductCategoryDomain, IProductCategoryInsance> {
    get attributes() {
        const attributes: DatabaseModelAttributes<IProductCategoryInsance> = {
            id: {
                type: DatabaseDataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: 'product_category_id'
            },
            productId: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'product_id',
            },
            categoryId: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: true,
                field: 'category_id'
            },
            createdAt: {
                type: DatabaseDataTypes.DATE,
                allowNull: false,
                field: 'created_at',
                defaultValue: DatabaseDataTypes.NOW
            },
            updatedAt: {
                type: DatabaseDataTypes.DATE,
                allowNull: false,
                field: 'updated_at'
            }
        }

        return attributes
    }

    get modelName() {
        return MODEL.PRODUCT_CATEGORY;
    }

    get options() {
        const options: ModelOptions = {
            tableName: TABLE.PRODUCT_CATEGORY
        }

        return options
    }

}