import { BaseRouter } from '../base';
import { ILogger } from '../../../utils/logger';
import { IRouterValidator } from '../base/router-validator';
import { injectable } from '../../../ioc';

@injectable()
export class ApiRouter extends BaseRouter {
  constructor(logger: ILogger, validator: IRouterValidator) {
    super(logger, validator);
    if (ApiRouter.prefix){
      this.stack.push(ApiRouter.prefix);
    }
  }

  static get prefix() {
    return 'apis';
  }
}
