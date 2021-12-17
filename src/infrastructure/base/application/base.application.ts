import { TYPES, LOGGER } from '../../../const'

import { inject, injectable } from '../../ioc'
import { IConfiguration } from '../../utils/configuration/configuration'
import { ILog, ILogger } from '../../utils/logger/logger';

export interface IApplication {
    load(): Promise<void>;
    start(): Promise<void>;
}

@injectable()
export abstract class BaseApplication {
    @inject(TYPES.CONFIG)
    protected config: IConfiguration | undefined;

    @inject(TYPES.LOGGER)
    protected logger: ILogger | undefined;

    get log(): ILog | undefined {
        if (this.logger) {
            let applicationLogger = Symbol.keyFor(LOGGER.APPLICATION)
            let id = Symbol.keyFor(this.id)
            if (applicationLogger && id) {
               
                return this.logger.get(applicationLogger, id) 
            }
        }

        return undefined
    }

    abstract id: symbol
    abstract load(): Promise<void>;
    abstract start(): Promise<void>;
}