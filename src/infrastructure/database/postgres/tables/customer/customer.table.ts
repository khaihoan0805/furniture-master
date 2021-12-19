import { DatabaseDataTypes, DatabaseModelAttributes, ModelInstance, ModelOptions } from '../../..';
import { API_DOMAIN, DATABASE, MODEL, TABLE, TYPES } from '../../../../../const';
import { ICustomerDomain } from '../../../../../domain';
import { CustomerDomain } from '../../../../../domain/customer/customer.domain';
import { singletonNamedProvide } from '../../../../ioc';
import { BasePostgresTable } from '../base';

export interface ICustomerInstance extends ModelInstance<ICustomerDomain> {}

@singletonNamedProvide(TYPES.DATABASE, API_DOMAIN.CUSTOMER)
export class CustomerModel extends BasePostgresTable<ICustomerDomain, ICustomerInstance> {
    get attributes() {
        const attributes: DatabaseModelAttributes<ICustomerInstance> = {
            id: {
                type: DatabaseDataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                field: 'customer_id'
            },
            name: {
                type: DatabaseDataTypes.STRING,
                allowNull: false,
                field: 'name'
            },
            occupation: {
                type: DatabaseDataTypes.STRING,
                allowNull: false,
                field: 'occupation'
            },
            status: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'status'
            },
            age: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'age'
            },
            phone: {
                type: DatabaseDataTypes.STRING,
                allowNull: false,
                field: 'phone'
            },
            defaultAddress: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'default_address'
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
        return MODEL.CUSTOMER;
    }

    get options() {
        const options: ModelOptions = {
            tableName: TABLE.CUSTOMER
        }

        return options
    }
}