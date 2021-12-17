import { WhereOptions, IncludeOptions } from "..";
import { Criteria, Sort, Filter, Include } from "../../repository";
import { QueryBuilder } from "../query-builder";
import { Query } from "../query-factory";


export class QueryParser {
    public static parseOffsetAndLimit(data: Criteria): { offset: number; limit: number } {
        if (!data)
            return null;

        let { offset, limit } = data;

        if (!offset && !limit)
            return null;

        offset = Number(offset);
        limit = Number(limit);
        return {
            offset: isNaN(offset) ? 0 : offset, limit: isNaN(limit) ? 10 : limit
        }
    }
    public static parseSort(sort: Sort): [[string, string]] {
        if (!sort || !sort.column)
            return null;

        return [[sort.column, ['asc', 'desc'].indexOf(sort.direction) > -1 ? sort.direction : 'asc']];
    }
    public static parseFilters(filters: Filter[]): WhereOptions<any> {
        if (!filters || !filters.length)
            return {};

        const where: WhereOptions<any> = {}

        filters.forEach(filter => {
            if (!filter.code || !filter.operator || !filter.value) return
            switch (filter.operator) {
                /**
                 * String
                 */
                case 'equals':
                    where[filter.code] = filter.value;
                    break;
                case 'does_not_equal':
                    where[filter.code] = { $not: filter.value };
                    break;
                case 'contains':
                    where[filter.code] = { $like: `%${filter.value}%` };
                    break;
                case 'does_not_contain':
                    where[filter.code] = { $notLike: `%${filter.value}%` };
                    break;
                case 'contains_case_insensitive':
                    where[filter.code] = { $iLike: `%${filter.value}%` };
                    break;
                case 'does_not_contain_case_insensitive':
                    where[filter.code] = { $notILike: `%${filter.value}%` };
                    break;
                case 'starts_with':
                    where[filter.code] = { $like: `${filter.value}%` };
                    break;
                case 'ends_with':
                    where[filter.code] = { $like: `%${filter.value}` };
                    break;

                /**
                 * Logic
                 */
                case 'is':
                    where[filter.code] = { $in: filter.value };
                    break;
                case 'is_not':
                    where[filter.code] = { $notIn: filter.value };
                    break;

                /**
                 * Array
                 */
                case 'array_contains':
                    where[filter.code] = { $contains: filter.value };
                    break;

                /**
                 * Number
                 */
                case 'is_greater_than':
                    where[filter.code] = { $gt: filter.value };
                    break;
                case 'is_smaller_than':
                    where[filter.code] = { $lt: filter.value };
                    break;

                default:
            }
        })
        return where;

    }
    public static parseInclude(include: Include): IncludeOptions {
        if (!include || !include.field)
            return {}
        const result: IncludeOptions = {
            association: include.field,
            attributes: {
                exclude: ['password']
            }
        }
        if (include.select)
            result.attributes = include.select;

        if (include.filters)
            result.where = this.parseFilters(include.filters);

        if (include.includes)
            result.include = include.includes.map(_include => this.parseInclude(_include))

        return result;

    }
    public static parseIncludes(includes: string): IncludeOptions[] {
        try {
            let arr: Include[]
            arr = JSON.parse(includes)

            if (!arr || !arr.length)
                return []
            return arr.map(include => this.parseInclude(include))

        } catch (err) {
            return []
        }
    }
    public static parseSearch(keyword: string): WhereOptions<any> {
        if (!keyword)
            return null
        if (/^\d{9}$/.test(keyword))
            return { id: Number(keyword) }

        return {
            name: {
                $iLike: `%${keyword}%`
            }
        }
    }
    public static parse(data: Criteria): Query {
        const builder = new QueryBuilder();

        if (data.select) {
            const attributes: string[] = data.select
            builder.setAttributes(attributes)
        }

        if (data.sort) {
            const order: [[string, string]] = this.parseSort(data.sort)
            builder.setOrder(order);
        }

        if (data.transaction)
            builder.setTransaction(data.transaction)

        if (data.filters) {
            const where = this.parseFilters(data.filters)
            builder.setWhere(where);
        }

        if (data.offset || data.limit) {
            const offsetAndLimit = this.parseOffsetAndLimit(data);
            console.log(`offsetAndLimit`, offsetAndLimit)
            if (offsetAndLimit) {
                builder.setOffset(offsetAndLimit.offset);
                builder.setLimit(offsetAndLimit.limit);
            }
        }
        
        if (data.includes && data.includes.length) {
            const includes = data.includes.map(include => this.parseInclude(include))

            builder.setInclude(includes)
        }
        return builder.build();
    }
}