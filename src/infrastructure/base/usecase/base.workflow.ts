import { LOGGER, TYPES } from '../../../const';
import { inject, injectable } from '../../ioc';
import { IConfiguration, ILog, ILogger } from '../../utils';
import { IBaseHttpInput } from '../input';
import { IBaseHttpOutput } from '../ouput';


export interface IBaseUsecase<I extends IBaseHttpInput, O extends IBaseHttpOutput> {
    id: symbol;
    execute(input: I): Promise<O>;
}

@injectable()
export abstract class BaseUsecase<I extends IBaseHttpInput, O extends IBaseHttpOutput> {
    @inject(TYPES.CONFIG)
    protected config: IConfiguration;

    @inject(TYPES.LOGGER)
    protected logger: ILogger;

    get log(): ILog {
        const workflowLogger = Symbol.keyFor(LOGGER.USECASE)
        const id = Symbol.keyFor(this.id)
        if(workflowLogger && this.id) {
            return this.logger.get(
                workflowLogger,
                id
            )
        }

        return undefined
    }

    abstract id: symbol;
}