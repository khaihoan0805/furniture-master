import methodOverride from 'method-override';

import { TYPES } from '../../../../const';
import { singletonProvide, inject } from '../../../ioc';
import { BaseMiddleware } from '../base';

@singletonProvide(TYPES.MIDDLEWARE)
export class MethodOverrideMiddleware extends BaseMiddleware {
  constructor() {
    super();

    this.middleware.use(methodOverride('X-HTTP-Method'));
    this.middleware.use(methodOverride('X-HTTP-Method-Override'));
    this.middleware.use(methodOverride('X-Method-Override'));
    this.middleware.use(methodOverride('_method'));
  }

  get id() {
    return Symbol.for('METHOD_OVERRIDE_MIDDLEWARE');
  }
}
