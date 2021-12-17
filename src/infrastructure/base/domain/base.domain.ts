import { IValidator, ILogger, ILog } from '../../utils';
import { TYPES, LOGGER } from '../../../const';
import { inject, injectable } from '../../ioc';

export interface IDomain {
    id?: number
}


@injectable()
export abstract class BaseDomain<T> {
    protected abstract nameContext: symbol;

    @inject(TYPES.VALIDATOR)
    protected validator: IValidator | undefined;

    constructor(protected context: T) { }

    abstract toString(): string;
    abstract json(): any;

    @inject(TYPES.LOGGER)
    protected logger: ILogger | undefined;

    get log(): ILog | undefined {
        if (this.logger) {
            let domainLogger = Symbol.keyFor(LOGGER.DOMAIN)
            let nameContext = Symbol.keyFor(this.nameContext)
            if (domainLogger && nameContext) {
                return this.logger.get(
                    domainLogger,
                    nameContext
                )
            }
        }
        return undefined
    }

    isValid() {
        if (this.validator && this.log) {
            const { valid, errors } = this.validator.validate(
                Symbol.keyFor(this.nameContext),
                this.context,
            );
            !valid && this.log.error(errors);

            return valid;
        }
        return false
    }

    get isEmpty() {
        const { context } = this
        if (!context) {
            return true
        }
        return !Object.keys(context as any).length;
    }
}


