import { ISchema } from '../../../base/schema';
import { singletonProvide } from '../../../ioc';
import { TYPES } from '../../../../const';

@singletonProvide(TYPES.SCHEMA)
export class CreateCategogyInputSchema implements ISchema {
  $id = 'POST::/apis/categories/create-category';
  title = 'category.create-category';
  type = 'object';
  required = ['name', 'status'];
  properties = {
    image: { type: 'string', minLength: 3, maxLength: 255 },
    name: { type: 'string', minLength: 3 },
    status: { type: 'integer', minimum: 1 },
    description: { type: 'string', minLength: 1 }
  }
}

@singletonProvide(TYPES.SCHEMA)
export class FindCategoryByIdInputSchema implements ISchema {
  $id = 'GET::/apis/categories/find-category-by-id';
  title = 'category.find-category-by-id';
  type = 'object';
  required = ['id'];
  properties = {
    id: { type: 'string' }
  }
}
