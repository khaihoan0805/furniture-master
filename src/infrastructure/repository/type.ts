export { PaginateResult } from '../database'

export type Criteria = {
    select?: string[];
    filters?: Filter[];
    sort?: Sort;
    offset?: number;
    limit?: number;
    includes?: Include[];
    transaction?: any;
};


export type Filter = {
    code: string;
    operator: Operator;
    value: string | number | (string | number)[];
};

export type Operator =
    | 'is_greater_than'
    | 'is_smaller_than'
    | 'contains'
    | 'does_not_contain'
    | 'contains_case_insensitive'
    | 'does_not_contain_case_insensitive'
    | 'is'
    | 'is_not'
    | 'equals'
    | 'does_not_equal'
    | 'array_contains'
    | 'starts_with'
    | 'ends_with';

export const enum Operators {
    IsGreaterThan = 'is_greater_than',
    IsSmallerThan = 'is_smaller_than',
    Contains = 'contains',
    DoesNotContain = 'does_not_contain',
    ContainsCaseInsensitive = 'contains_case_insensitive',
    DoesNotContainCaseInsensitive = 'does_not_contain_case_insensitive',
    Is = 'is',
    IsNot = 'is_not',
    Equals = 'equals',
    DoesNotEqual = 'does_not_equal',
    ArrayContains = 'array_contains',
    StartsWith = 'starts_with',
    EndsWith = 'ends_with',
}

export enum SortDirections {
    ASC = 'asc',
    DESC = 'desc',
}

export type SortDirection = 'asc' | 'desc';

export type Sort = {
    column: string;
    direction: SortDirection;
};

export type Include = {
    field: string;
    select?: string[];
    includes?: Include[];
    filters?: Filter[];
};