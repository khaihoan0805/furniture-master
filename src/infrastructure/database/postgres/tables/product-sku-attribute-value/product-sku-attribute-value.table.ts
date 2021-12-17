import { DatabaseDataTypes, DatabaseModelAttributes, ModelInstance, ModelOptions } from "../../..";
import { API_DOMAIN, MODEL, TABLE, TYPES } from "../../../../../const";
import { IProductSKUAttributeValueDomain } from "../../../../../domain";
import { singletonNamedProvide } from "../../../../ioc";
import { BasePostgresTable } from "../base";

export interface IProductSKUAttributeValueInstance extends ModelInstance<IProductSKUAttributeValueDomain> {}

@singletonNamedProvide(TYPES.DATABASE, API_DOMAIN.PRODUCT_SKU_ATTRIBUTE_VALUE)
export class productSKUAttributeValueModel extends BasePostgresTable<IProductSKUAttributeValueDomain, IProductSKUAttributeValueInstance> {
    get attributes() {
        const attributes: DatabaseModelAttributes<IProductSKUAttributeValueInstance> = {
            id: {
                type: DatabaseDataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: 'id'
            },
            attributeId: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'attribute_id'
            },
            attributeValueId: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'attribute_value_id'
            },
            attributeName: {
                type: DatabaseDataTypes.STRING,
                allowNull: false,
                field: 'attribute_name'
            },
            attributeValue: {
                type: DatabaseDataTypes.STRING,
                allowNull: false,
                field: 'attribute_name'
            },
            status: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'status'
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
        return MODEL.PRODUCT_SKU_ATTRIBUTE_VALUE;
    }

    get options() {
        const options: ModelOptions = {
            tableName: TABLE.PRODUCT_SKU_ATTRIBUTE_VALUE
        }
        
        return options;
    }
}