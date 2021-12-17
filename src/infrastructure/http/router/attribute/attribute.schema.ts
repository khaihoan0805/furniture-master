import { ISchema } from '../../../base/schema';
import { singletonProvide } from '../../../ioc';
import { TYPES } from '../../../../const';

@singletonProvide(TYPES.SCHEMA)
export class CreateAttributeInputSchema implements ISchema {
  $id = 'POST::/apis/attributes/create-attribute';
  title = 'attribute.create-attribute';
  type = 'object';
  required = ['name', 'status'];
  properties = {
    name: { type: 'string', minLength: 3 },
    status: { type: 'integer', minimum: 1 }
  }
}

@singletonProvide(TYPES.SCHEMA)
export class FindAttributeByIdInputSchema implements ISchema {
  $id = 'GET::/apis/attributes/find-attribute-by-id';
  title = 'attribute.find-attribute-by-id';
  type = 'object';
  required = ['id'];
  properties = {
    id: { type: 'integer', minimum: 1 }
  }
}
