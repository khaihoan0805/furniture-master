import { LOGGER, TYPES } from '../../../const';
import { ILog, ILogger } from '../../../infrastructure';
import { inject, injectable } from '../../../infrastructure/ioc';

@injectable()
export abstract class BaseController {
    @inject(TYPES.LOGGER)
    protected logger: ILogger;

    get log(): ILog {
        let controllerLogger = Symbol.keyFor(LOGGER.CONTROLLER);
        if(controllerLogger) {
            return this.logger.get(
                controllerLogger,
                this.id.toString()
            )
        }
        
        return undefined;
    }

    abstract id: symbol;
}