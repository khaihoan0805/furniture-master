import { TYPES, LOGGER } from '../../../../const';

import { Http, Request } from '../../index';
import { inject, injectable } from '../../../ioc';
import { IConfiguration } from '../../../utils/configuration';
import { ILogger, ILog } from '../../../utils/logger';
import { IRouterValidator } from './router-validator';

@injectable()
export class BaseRouter {
  protected router = Http.SERVER;

  @inject(TYPES.CONFIG)
  protected config: IConfiguration | undefined;

  protected stack : string[] = [];

  constructor(
    protected logger: ILogger,
    protected validator: IRouterValidator,
  ) {}

  get log(): ILog | undefined {
    let infraLogger = Symbol.keyFor(LOGGER.INFRASTRUCTURE)
    let routerType = Symbol.keyFor(TYPES.ROUTER)
    let id
    if (this.id) {
      id = Symbol.keyFor(this.id)
    }
    if (this.logger){
      if (infraLogger && routerType && id) {
        return this.logger.get(
            infraLogger.toLowerCase(),
            routerType.toLowerCase(),
            id
        )
      }
    }
    return undefined
  }

  load() {
    if (this.log){
      this.log.info('LOADED');
    }
  }
  protected id: symbol | undefined;

  protected getContext(req: Request) {
    return JSON.stringify({ ...req.body, ...req.params, ...req.query });
  }

  static get prefix() {
    return '';
  }
  get path() {
    return [BaseRouter.prefix, ...this.stack].join('/');
  }
}
