export const DATABASE = {
    PRODUCT: Symbol.for('PRODUCT_POSTGRES'),
    USER: Symbol.for('USER_POSTGRES'),
    CATEGORY: Symbol.for('CATEGORY_POSTGRES'),
    ATTRIBUTE: Symbol.for('ATTRIBUTE_POSTGRES'),
    PRODUCT_ATTRIBUTE: Symbol.for('PRODUCT_ATTRIBUTE_POSTGRES'),
    PRODUCT_CATEGORY: Symbol.for('PRODUCT_CATEGORY_POSTGRES'),
    ORDER: Symbol.for('ORDER_POSTGRES'),
    ORDER_ITEM: Symbol.for('ORDER_ITEM_POSTGRES'),
    CUSTOMER: Symbol.for('CUSTOMER_POSTGRES'),
    PERMISSION: Symbol.for('PERMISSION_POSTGRES'),
    METADATA: Symbol.for('METADATA_POSTGRES'),
    IMAGE: Symbol.for('IMAGE_POSTGRES'),
    PRODUCT_IMAGE: Symbol.for('PRODUCT_IMAGE_POSTGRES'),
    SOURCE: Symbol.for('SOURCE_POSTGRES')
}

export enum TABLE {
    USER = 'tb_users',
    PRODUCT = 'tb_products',
    CHANNEL = 'tb_channels',
    PRODUCT_ATTRIBUTES = 'tb_products_attributes',
    CATEGORY = 'tb_categories',
    PRODUCT_CATEGORY = 'tb_products_caterogies',
    ATTRIBUTE = 'tb_attributes',
    ATTRIBUTES_VALUE = 'tb_attributes_values',
    PRODUCT_IMAGE = 'tb_product_images',
    IMAGE = 'tb_images',
    CUSTOMER = 'tb_customers',
    ADDRESS = 'tb_addresses',
    ORDER = 'tb_orders',
    ORDER_ITEM = 'tb_order_items',
    METADATA = 'tb_metadata',
    PERMISSION = 'tb_permissions',
    SOURCE = 'tb_sources',
    PRODUCT_SKU = 'tb_product_skus',
    PRODUCT_SKU_ATTRIBUTE_VALUE = 'tb_product_sku_attribute_values'
}


export enum MODEL {
    CHANNEL = 'channel',
    ATTRIBUTE = 'attribute',
    ATTRIBUTE_VALUE = 'attributeValue',
    USER = 'user',
    ACCOUNT_TYPE = 'accountType',
    PERMISSION = 'permission',
    ROLE = 'role',
    CATEGORY = 'category',
    PRODUCT = 'product',
    PRODUCT_CATEGORY = 'productCategory',
    PRODUCT_ATTRIBUTE = 'productAttribute',
    PRODUCT_SKU = 'productSKU',
    PRODUCT_SKU_ATTRIBUTE_VALUE = 'productSKUAttributeValue',
    METADATA = 'metadata',
    ORDER = 'order',
    ORDER_ITEM = 'orderItem',
    CUSTOMER = 'customer',
    ADDRESS = 'address',
    IMAGE = 'iamge',
    PRODUCT_IMAGE = 'productImage',
    SOURCE = 'source'
}