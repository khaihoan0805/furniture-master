import { injectable } from '../../ioc';

export interface IBaseHttpOutput {
    data?: any;
    response?: any;
}

@injectable()
export class BaseHttpOutput<O extends IBaseHttpOutput> {
    protected output: O

    constructor(output: O) {
        this.output = output
    }
}