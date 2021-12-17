import { ModelOptions } from 'sequelize/types';
import { DatabaseDataTypes, DatabaseModelAttributes, ModelInstance } from '../../..';
import { API_DOMAIN, DATABASE, MODEL, TABLE, TYPES } from '../../../../../const';
import { IImageDomain, ImageDomain } from '../../../../../domain';
import { singletonNamedProvide } from '../../../../ioc';
import { BasePostgresTable } from '../base';

export interface IImageInstance extends ModelInstance<IImageDomain> {}

@singletonNamedProvide(TYPES.DATABASE, API_DOMAIN.IMAGE)
export class ImageModel extends BasePostgresTable<IImageDomain, IImageInstance> {
    get attributes() {
        const attributes: DatabaseModelAttributes<IImageInstance> = {
            id: {
                type: DatabaseDataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                field: 'image_id'
            },
            name: {
                type: DatabaseDataTypes.STRING,
                allowNull: false,
                field: 'name'
            },
            url: {
                type: DatabaseDataTypes.STRING,
                allowNull: false,
                field: 'url'
            },
            description: {
                type: DatabaseDataTypes.STRING,
                allowNull: false,
                field: 'description'
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
        return MODEL.IMAGE;
    }

    get options() {
        const options: ModelOptions = {
            tableName: TABLE.IMAGE
        }

        return options;
    }
}