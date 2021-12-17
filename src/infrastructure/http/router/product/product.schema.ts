import { ISchema } from '../../../base/schema';
import { singletonProvide } from '../../../ioc';
import { TYPES } from '../../../../const';

@singletonProvide(TYPES.SCHEMA)
export class CreateProductInputSchema implements ISchema {
    $id = 'POST::/apis/products/create-product';
    title = 'product.create-product-by-id';
    type = 'object';
    required = ['image', 'name', 'status', 'slug', 'description', 'attributes', 'categories'];
    properties = {
        image: { type: 'string', minLength: 3 },
        name: { type: 'string', minLength: 3 },
        status: { type: 'integer', minimum: 1 },
        slug: { type: 'string', minLength: 3 },
        description: { type: 'string', minLength: 3 },
        attributes: {
            type: 'array',
            items: { type: 'integer', minimum: 1 }
        },
        categories: {
            type: 'array',
            items: { type: 'integer', minimum: 1 }
        },
    }
}

@singletonProvide(TYPES.SCHEMA)
export class FindProductByIdInputSchema implements ISchema {
    $id = 'GET::/apis/products/find-product-by-id';
    title = 'product.find-product';
    type = 'object';
    required = ['id'];
    properties = {
        id: { type: 'string', minimum: 1 }
    }
}

@singletonProvide(TYPES.SCHEMA)
export class UpdateProductInputSchema implements ISchema {
    $id = 'POST::/apis/products/update-product';
    title = 'product.update-product';
    type = 'object';
    required = ['id'];
    properties = {
        id: { type: 'integer', minimum: 1 },
        image: { type: 'string', minLength: 3 },
        name: { type: 'string', minLength: 3 },
        status: { type: 'integer', minimum: 1 },
        slug: { type: 'string', minLength: 3 },
        description: { type: 'string', minLength: 3 },
        attributes: {
            type: 'array',
            items: { type: 'integer', minimum: 1 }
        },
        categories: {
            type: 'array',
            items: { type: 'integer', minimum: 1 }
        },
    }
}

@singletonProvide(TYPES.SCHEMA)
export class PaginateProductInputSchema implements ISchema {
    $id = 'GET::/apis/products/paginate-product';
    title = 'product.paginate-product';
    type = 'object';
    properties = {
        limit: { type: 'string' },
        offset: { type: 'string' },
        pages: { type: 'string' }
    }
}

@singletonProvide(TYPES.SCHEMA)
export class FindProductByCategoryIdInputSchema implements ISchema {
    $id = 'GET::/apis/products/find-by-category-id';
    title = 'product.find-by-category-id';
    type = 'object';
    required = ['categoryId'];
    properties = {
        categoryId: { type: 'string', minimum: 1 }
    }
}