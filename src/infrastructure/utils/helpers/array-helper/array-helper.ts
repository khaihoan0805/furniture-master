import * as _ from 'lodash'

import { TYPES } from '../../../../const'
import { singletonProvide } from '../../../ioc'

export interface IArrayHelper {
    isEmpty(value: any): boolean;
    uniq<T>(array: ArrayLike<T>): T[];
    difference(array: ArrayLike<{}>, ...values: ArrayLike<{}>[]): {}[];
    differenceWith(array: ArrayLike<{}>, values: ArrayLike<{}>, comparator: any): {}[];
    flattenDeep(array: _.ListOfRecursiveArraysOrValues<{}>): {}[];
    compact(array: ArrayLike<any>): any[];
    chunk(array: ArrayLike<never>, size?: number): never[][];
    slice(array: ArrayLike<{}>, start?: number, end?: number): {}[];
    sortBy(array: ArrayLike<{}>, iteratees: any): {}[];
    orderBy(array: ArrayLike<{}>, iteratees: any, orders: any): {}[];
}

@singletonProvide(TYPES.ARRAY_HELPER)
export class ArrayHelper implements IArrayHelper {
    isEmpty(value: any): boolean {
        return _.isEmpty(value);
    }

    uniq<T>(array: ArrayLike<T>): T[] {
        return _.uniq<T>(array);
    }

    difference(array: ArrayLike<{}>, ...values: ArrayLike<{}>[]): {}[] {
        return _.difference(array, ...values);
    }

    differenceWith(array: ArrayLike<{}>, values: ArrayLike<{}>, comparator: any): {}[] {
        return _.differenceWith(array, values, comparator);
    }

    flattenDeep(array: _.ListOfRecursiveArraysOrValues<{}>): {}[] {
        return _.flattenDeep(array);
    }

    compact(array: ArrayLike<any>): any[] {
        return _.compact(array);
    }

    chunk(array: ArrayLike<never>, size?: number): never[][] {
        return _.chunk(array, size);
    }

    slice(array: ArrayLike<{}>, start?: number, end?: number): {}[] {
        return _.slice(array, start, end);
    }

    sortBy(array: ArrayLike<{}>, iteratees: any): {}[] {
        return _.sortBy(array, iteratees);
    }

    orderBy(array: ArrayLike<{}>, iteratees: any, orders: any): {}[] {
        return _.orderBy(array, iteratees, orders);
    }
}
