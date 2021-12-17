import { ISchema } from '../../../base/schema';
import { singletonProvide } from '../../../ioc';
import { TYPES } from '../../../../const';

@singletonProvide(TYPES.SCHEMA)
export class CreateUserInputSchema implements ISchema {
  $id = 'POST::/apis/users/create-user';
  title = 'user.create-user';
  type = 'object';
  required = ['firstName', 'lastName', 'email', 'password', 'isSuperAdmin'];
  properties = {
    fistName: { type: 'string', minLength: 3, maxLength: 255 },
    lastName: { type: 'string', minLength: 3 },
    password: { type: 'string', minLength: 3 },
    email: { type: 'string', format: 'email', minLength: 3, maxLength: 255 },
    isSuperAdmin: { type: 'boolean' },
  }
}