import { injectable } from '../../ioc';

export interface ISchema {
  $id: string;
  type: string;
  properties?: Object;
  required?: string[];
}

@injectable()
export abstract class BaseSchema {
  abstract id: symbol;
  abstract type: string;
}
