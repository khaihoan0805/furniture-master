import { inject, injectable } from "inversify";
import { ILogger, ILog, IErrorFactory } from "../../..";
import { TYPES, LOGGER } from "../../../../const";
import { IEntityFactory } from "../../../../domain";

export interface IStep<I, O> {
    id: Symbol;
    run(input: I): O | Promise<O>;
}

@injectable()
export abstract class BaseStep<I, O> implements IStep<I, O> {
    // @inject(TYPES.DEBUGGER)
    // protected debugger: IDebugger | undefined;

    abstract id: symbol;

    @inject(TYPES.ENTITY_FACTORY)
    protected entityFactory: IEntityFactory;

    @inject(TYPES.ERROR_FACTORY)
    protected errorFactory: IErrorFactory;

    @inject(TYPES.LOGGER)
    protected logger: ILogger | undefined;

    get log(): ILog | undefined {
        if (this.logger) {
            let usecaseLogger = Symbol.keyFor(LOGGER.STEP)
            let id = Symbol.keyFor(this.id)
            if (usecaseLogger && id) {
                return this.logger.get(
                    usecaseLogger,
                    id
                )
            }
        }
        return undefined
    }

    abstract run(input: I): O | Promise<O>;

    // get debug() {
    //     let stepType = Symbol.keyFor(TYPES.STEP)
    //     let id = Symbol.keyFor(this.id)
    //     if (this.debugger) {
    //         if (stepType && id) {
    //             return this.debugger.get(
    //                 stepType.toLowerCase(),
    //                 id.toLowerCase()
    //             )
    //         }
    //     }
    // }

}