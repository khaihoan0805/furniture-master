import { ModelOptions } from 'sequelize/types';
import { DatabaseDataTypes, DatabaseModelAttributes, ModelInstance } from '../../..';
import { API_DOMAIN, DATABASE, MODEL, TABLE, TYPES } from '../../../../../const';
import { IMetadataDomain, MetadataDomain } from '../../../../../domain';
import { singletonNamedProvide } from '../../../../ioc';
import { BasePostgresTable } from '../base';

export interface IMetadataInstance extends ModelInstance<IMetadataDomain> {}

@singletonNamedProvide(TYPES.DATABASE, API_DOMAIN.METADATA)
export class MetadataModel extends BasePostgresTable<IMetadataDomain, IMetadataInstance> {
    get attributes() {
        const attributes: DatabaseModelAttributes<IMetadataInstance> = {
            id: {
                type: DatabaseDataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                field: 'metadata_id'
            },
            productId: {
                type: DatabaseDataTypes.INTEGER,
                allowNull: false,
                field: 'product_id'
            },
            description: {
                type: DatabaseDataTypes.STRING,
                allowNull: false,
                field: 'description'
            },
            metaKeyword: {
                type: DatabaseDataTypes.STRING,
                allowNull:false,
                field: 'meta_keyword'
            },
            metaDesciption: {
                type: DatabaseDataTypes.STRING,
                allowNull: false,
                field: 'meta_description'
            },
            metaImage: {
                type: DatabaseDataTypes.STRING,
                allowNull: false,
                field: 'meta_image'
            },
            canonical: {
                type: DatabaseDataTypes.STRING,
                allowNull: false,
                field: 'canonical'
            },
            metaUrl: {
                type: DatabaseDataTypes.STRING,
                allowNull: false,
                field: 'meta_url'
            },
            metaType: {
                type: DatabaseDataTypes.STRING,
                allowNull: false,
                field: 'meta_type'
            },
            metaTitle: {
                type: DatabaseDataTypes.STRING,
                allowNull: false,
                field: 'meta_title'
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
        return MODEL.METADATA;
    }

    get options() {
        const options: ModelOptions = {
            tableName: TABLE.METADATA
        }

        return options
    }
}