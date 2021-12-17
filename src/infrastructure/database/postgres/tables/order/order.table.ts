import { DatabaseDataTypes, DatabaseModelAttributes, ModelInstance, ModelOptions } from "../../../index";
import { API_DOMAIN, DATABASE, MODEL, TABLE, TYPES } from "../../../../../const";
import { IOrderDomain, OrderDomain } from "../../../../../domain";
import { singletonNamedProvide } from '../../../../ioc';
import { BasePostgresTable } from "../base";

export interface IOrderInstance extends ModelInstance<IOrderDomain> {}

@singletonNamedProvide(TYPES.DATABASE, API_DOMAIN.ORDER)
export class OrderModel extends BasePostgresTable<IOrderDomain, IOrderInstance> {
    get attributes() {
        const attributes: DatabaseModelAttributes<IOrderInstance> = {
            id: {
                type: DatabaseDataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                field: 'order_id'
            },
            customerId: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'customer_id'
            },
            status: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'status'
            },
            channelId: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'channel_id'
            },
            type: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'type'
            },
            note: {
                type: DatabaseDataTypes.STRING,
                allowNull: false,
                field: 'note'
            },
            city: {
                type: DatabaseDataTypes.STRING,
                allowNull: false,
                field: 'city'
            },
            district: {
                type: DatabaseDataTypes.STRING,
                allowNull: false,
                field: 'district'
            },
            shippingMethod: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'shipping_method'
            },
            paymentMethod: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'payment_method'
            },
            saleCost: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'sale_cost'
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
        return MODEL.ORDER;
    }

    get options() {
        const options: ModelOptions = {
            tableName: TABLE.ORDER
        }

        return options;
    }
}
