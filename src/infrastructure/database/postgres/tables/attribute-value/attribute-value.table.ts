import { DatabaseDataTypes, DatabaseModelAttributes, ModelInstance, ModelOptions } from "../../..";
import { API_DOMAIN, MODEL, TABLE, TYPES } from "../../../../../const";
import { IAttributeDomain, IAttributeValueDomain } from "../../../../../domain";
import { singletonNamedProvide } from "../../../../ioc";
import { BasePostgresTable } from "../base";

export interface IAttributeValueInstance extends ModelInstance<IAttributeValueDomain> { }

@singletonNamedProvide(TYPES.DATABASE, API_DOMAIN.ATTRIBUTE_VALUE)
export class AttributeValueModel extends BasePostgresTable<IAttributeValueDomain, IAttributeValueInstance> {
    get attributes() {
        const attributes: DatabaseModelAttributes<IAttributeValueInstance> = {
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
            value: {
                type: DatabaseDataTypes.STRING,
                allowNull: false,
                field: 'value'
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
        return MODEL.ATTRIBUTE_VALUE;
    }

    get options() {
        const options: ModelOptions = {
            tableName: TABLE.ATTRIBUTES_VALUE
        }
        
        return options;
    }
}