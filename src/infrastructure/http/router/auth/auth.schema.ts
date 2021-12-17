import { ISchema } from '../../../base/schema';
import { singletonProvide } from '../../../ioc';
import { TYPES } from '../../../../const';

@singletonProvide(TYPES.SCHEMA)
export class SignInSchema implements ISchema {
  $id = 'POST::/apis/auths/sign-in';
  title = 'auth.sign-in';
  type = 'object';
  required = ['email', 'password'];
  properties = {  
    password: { type: 'string', minLength: 3 },
    email: { type: 'string', format: 'email', minLength: 3, maxLength: 255 },
  }
}