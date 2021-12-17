import { Transaction, FindOptions, WhereOptions, IncludeOptions } from "sequelize";
import { Query } from "../query-factory";


export class QueryBuilder {
  
  private query: FindOptions = {};

  setAttributes(attributes: string[]): QueryBuilder {
    this.query.attributes = attributes;

    return this;
  }

  setWhere(where: WhereOptions): QueryBuilder {
    this.query.where = where;

    return this;
  }

  setLimit(limit: number): QueryBuilder {
    this.query.limit = limit || 10;

    return this;
  }


  setOrder(order: [[string, string]]): QueryBuilder {
    this.query.order = order;

    return this;
  }

  setOffset(offset: number): QueryBuilder {
    this.query.offset = offset;

    return this;
  }

  setInclude(include: IncludeOptions[]): QueryBuilder {
    this.query.include = include;

    return this;
  }

  setTransaction(transaction: Transaction): QueryBuilder {
    this.query.transaction = transaction;

    return this;
  }

  build(): Query {
    return new Query(this.query);
  }
}
