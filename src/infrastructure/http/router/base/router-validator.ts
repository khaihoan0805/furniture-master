import { TYPES, LOGGER } from '../../../../const';
import { singletonProvide, inject } from '../../../ioc';
import { IValidator } from '../../../utils/validator';
import { Request, Response, NextFunction } from '../../index';
import { ILogger, ILog } from '../../../utils/logger';

export interface IRouterValidator {
  validate: (req: Request, res: Response, next: NextFunction) => void;
}

@singletonProvide(TYPES.ROUTER_VALIDATOR)
export class RouterValidator {
  @inject(TYPES.VALIDATOR) validator: IValidator | undefined;

  @inject(TYPES.LOGGER)
  protected logger: ILogger | undefined;

  get log(): ILog | undefined {
    let infraLogger = Symbol.keyFor(LOGGER.INFRASTRUCTURE)
    let routerValidatorType = Symbol.keyFor(TYPES.ROUTER_VALIDATOR)
    if (this.logger && infraLogger && routerValidatorType) {
      return this.logger.get(
          infraLogger.toLowerCase(),
          routerValidatorType.toLowerCase()
      )
    }
    return undefined
  }

  get validate() {
    return (req: Request, res: Response, next: NextFunction) => {
      const shemaId = [req.method, req.route.path].join('::');

      this.log.info(shemaId)

      const data = { ...req.params, ...req.body, ...req.query };

      console.log(data)

      if (this.validator){
        const { valid, errors } = this.validator.validate(shemaId, data);

        if (!valid) {
          res.json({ status: 400, messages: errors });
          if (this.log){
            this.log.error(`shemaId: ${shemaId}: "${errors}" -`, data);
          }
          return;
        }
      }

      next();
    };
  }
}
