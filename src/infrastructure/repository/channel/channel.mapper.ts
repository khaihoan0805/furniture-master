import { API_DOMAIN, TYPES } from "../../../const";
import { IChannelDomain } from "../../../domain";
import { singletonNamedProvide } from "../../ioc";
import { BaseDatabMapper, IDataMapper } from "../base";

export interface IChannelMapper extends IDataMapper<IChannelDomain> { }

@singletonNamedProvide(TYPES.MAPPER, API_DOMAIN.CHANNEL)
export class ChannelMapper extends BaseDatabMapper<IChannelDomain> implements IChannelMapper {
    protected entityType = API_DOMAIN.PRODUCT;

    get toEntityFields() {
        const toEntityFields: string[] = [
            'id',
            'name',
            'createdBy',
            'createdAt',
            'updatedBy',
            'updatedAt',
        ]

        return toEntityFields;
    }

    get toDatabaseFields() {
        const toDatabaseFields: string[] = [
            'id',
            'name',
            'createdBy',
            'createdAt',
            'updatedBy',
            'updatedAt'
        ]

        return toDatabaseFields;
    }
}