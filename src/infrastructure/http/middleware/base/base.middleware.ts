import { TYPES, LOGGER } from '../../../../const';
import { Http } from '../../http';
import { inject, injectable } from '../../../ioc';
import { IConfiguration } from '../../../utils/configuration';
import { ILogger, ILog } from '../../../utils/logger';

@injectable()
export abstract class BaseMiddleware {
  protected middleware = Http.SERVER;

  @inject(TYPES.LOGGER)
  private logger: ILogger | undefined;


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
            id.toLowerCase()
        )
      }
    }
    return undefined
  }

  load() {
    let id = Symbol.keyFor(this.id)
    if (this.log && id) {
      this.log.info(id.toLowerCase());
    }
  }

  @inject(TYPES.CONFIG)
  protected config: IConfiguration | undefined;

  abstract id: symbol;
}
