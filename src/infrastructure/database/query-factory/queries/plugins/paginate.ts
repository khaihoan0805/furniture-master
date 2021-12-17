import { Query } from "../..";
import { PaginateResult } from "../../../index";

export async function paginate<T = any>(query: Query) {
    const { offset, limit } = query.options;

    console.log(query.options)

    if (!offset && offset !== 0) { throw Error('missing offset'); }
    if (!limit) { throw Error('missing limit'); }
  
    const data = await this.findAndCountAll(query.options);
  
    const result: PaginateResult<T> = {
      docs: data.rows,
      total: data.count,
      limit,
      offset,
    };
  
    return result;
  }