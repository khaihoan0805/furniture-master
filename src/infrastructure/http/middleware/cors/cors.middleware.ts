import cors from 'cors';

import { TYPES } from '../../../../const';
import { singletonProvide, inject } from '../../../ioc';
import { BaseMiddleware } from '../base';

@singletonProvide(TYPES.MIDDLEWARE)
export class CorsMiddleware extends BaseMiddleware {
  constructor() {
    super();
    this.middleware.use(cors());
  }

  get id() {
    return Symbol.for('CORS_MIDDLEWARE');
  }
}
