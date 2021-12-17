import { DatabaseDataTypes, DatabaseModelAttributes, ModelInstance, ModelOptions } from "../../..";
import { API_DOMAIN, MODEL, TABLE, TYPES } from "../../../../../const";
import { IProductSKUDomain } from "../../../../../domain";
import { singletonNamedProvide } from "../../../../ioc";
import { BasePostgresTable } from "../base";

export interface IProductSKUIntance extends ModelInstance<IProductSKUDomain> {}

@singletonNamedProvide(TYPES.DATABASE, API_DOMAIN.PRODUCT_SKU)
export class ProductSKUModel extends BasePostgresTable<IProductSKUDomain, IProductSKUIntance> {
    get attributes() {
        const attributes: DatabaseModelAttributes<IProductSKUIntance> = {
            id: {
                type: DatabaseDataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                field: 'id'
            },
            code: {
                type: DatabaseDataTypes.STRING,
                allowNull: false,
                field: 'code'
            },
            productId: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'product_id'
            },
            image: {
                type: DatabaseDataTypes.STRING,
                allowNull: true,
                field: 'image'
            },
            status: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'status'
            },
            quantity: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'quantity'
            },
            currentPrice: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'current_price'
            },
            price: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'price'
            },
            slug: {
                type: DatabaseDataTypes.STRING,
                allowNull: true,
                unique: true,
                field: 'slug'
            },
            description: {
                type: DatabaseDataTypes.STRING,
                allowNull: true,
                field: 'description'
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
                field: 'updated_at',
                defaultValue: DatabaseDataTypes.NOW
            }
        }

        return attributes;
    }

    get modelName() {
        return MODEL.PRODUCT_SKU;
    }

    get options() {
        const options: ModelOptions = {
            tableName: TABLE.PRODUCT_SKU
        }

        return options;
    }
}