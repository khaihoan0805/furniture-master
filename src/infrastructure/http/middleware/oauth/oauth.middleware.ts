import { TYPES } from '../../../../const';
import { singletonProvide, inject } from '../../../ioc';
import { BaseMiddleware } from '../base';

@singletonProvide(TYPES.MIDDLEWARE)
export class OauthMiddleware extends BaseMiddleware {
  constructor() {
    super();
  }

  get id() {
    return Symbol.for('OAUTH');
  }
}
