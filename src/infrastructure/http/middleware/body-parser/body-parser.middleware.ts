import bodyParser from 'body-parser';

import { TYPES } from '../../../../const';
import { singletonProvide, inject } from '../../../ioc';
import { BaseMiddleware } from '../../middleware/base';

@singletonProvide(TYPES.MIDDLEWARE)
export class BodyParserMiddleware extends BaseMiddleware {
  constructor() {
    super();
    this.middleware.use(bodyParser.json())
  }

  get id() {
    return Symbol.for('BODY_PARSER_MIDDLEWARE');
  }
}
