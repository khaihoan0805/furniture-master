import * as _ from 'lodash';
import { singletonProvide } from "../../../ioc";
import { TYPES } from "../../../../const";

export interface IObjectHelper {
    omitByUndefined(object: any): any;
    pick(object: any, ...props: any[]): any;
    cloneDeep(value: any): any;
    isEqual(value: any, other: any): boolean;
    extend(obj: {}, src: {}): {};
    clone(value: {}): {};
    forOwn(value: any, callback: any): void;
    set(object: {}, path: _.Many<string | number | symbol>, value: any): {};
    values<T extends object>(object: T | null | undefined): Array<T[keyof T]>;
    isEmpty(value: any): boolean;
}

@singletonProvide(TYPES.OBJECT_HELPER)
export class ObjectHelper implements IObjectHelper {
    omitByUndefined(object: any): any {
        return _.omitBy(object, _.isUndefined);
    }

    pick(object: any, ...props: any[]): any {
        return _.pick(object, ...props);
    }

    cloneDeep(value: any): any {
        return _.cloneDeep(value);
    }

    isEqual(value: any, other: any): boolean {
        return _.isEqual(value, other);
    }

    extend(obj: {}, src: {}): {} {
        return _.extend(obj, src);
    }

    clone(value: {}): {} {
        return _.clone(value);
    }

    set(object: {}, path: _.Many<string | number | symbol>, value: any): {} {
        return _.set(object, path, value);
    }

    forOwn(value: any, callback: any): void {
        return _.forOwn(value, callback)
    }

    values<T extends object>(object: T | null | undefined): Array<T[keyof T]> {
        return _.values(object);
    }
    isEmpty(value: any): boolean {
        return _.isEmpty(value);
    }
}
