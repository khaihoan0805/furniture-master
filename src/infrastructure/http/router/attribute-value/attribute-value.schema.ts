import { ISchema } from '../../../base/schema';
import { singletonProvide } from '../../../ioc';
import { TYPES } from '../../../../const';

@singletonProvide(TYPES.SCHEMA)
export class CreateAttributeValueInputSchema implements ISchema {
  $id = 'POST::/apis/attribute-values/create-attribute-value';
  title = 'attribute-value.create-attribute-value-by-id';
  type = 'object';
  required = ['attributeId', 'value', 'status'];
  properties = {
    fistName: { type: 'integer', minimum: 1},
    value: { type: 'string', minLength: 3 },
    status: { type: 'integer', minimum: 1}
  }
}

@singletonProvide(TYPES.SCHEMA)
export class FindAttributeValueByIdInputSchema implements ISchema {
  $id = 'POST::/apis/attribute-values/find-attribute-value-by-id';
  title = 'attribute-value.find-attribute-value';
  type = 'object';
  required = ['id'];
  properties = {
    id: { type: 'integer', minimum: 1}
  }
}

@singletonProvide(TYPES.SCHEMA)
export class UpdateAttributeValueInputSchema implements ISchema {
  $id = 'POST::/apis/attribute-values/update-attribute-value';
  title = 'attribute-value.update-attribute-value';
  type = 'object';
  required = ['id'];
  properties = {
    id: { type: 'integer', minimum: 1},
    fistName: { type: 'integer', minimum: 1},
    value: { type: 'string', minLength: 3 },
    status: { type: 'integer', minimum: 1}
  }
}