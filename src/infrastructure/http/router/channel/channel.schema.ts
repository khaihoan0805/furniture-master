import { ISchema } from '../../../base/schema';
import { singletonProvide } from '../../../ioc';
import { TYPES } from '../../../../const';

@singletonProvide(TYPES.SCHEMA)
export class CreateChannelInputSchema implements ISchema {
    $id = 'POST::/apis/channels/create-channel';
    title = 'channel.create-hannel';
    type = 'object';
    required = ['name'];
    properties = {
        name: { type: 'string', minLength: 3 },
    }
}

@singletonProvide(TYPES.SCHEMA)
export class FindChannelByIdInputSchema implements ISchema {
    $id = 'GET::/apis/channels/find-channel-by-id';
    title = 'channel.find-channel-by-id';
    type = 'object';
    required = ['id'];
    properties = {
        id: { type: 'string' }
    }
}
