import { inject, namedInject, singletonNamedProvide } from '../../ioc';
import { API_DOMAIN, DATABASE, LOGGER, NAMES, TABLE, TYPES } from "../../../const";
import { IConfiguration, ILog, ILogger } from "../../utils";
import { Sequelize } from "sequelize";
import { DatabaseModels } from '../index';
import { IBasePostgresTable } from './tables/base';
import { IUserDomain, IProductDomain, ICategoryDomain, IAttributeDomain, IProductCategoryDomain, ICustomerDomain, IOrderItemDomain, IAttributeValueDomain, IChannelDomain, IOrderDomain } from '../../../domain';
import { IAttributeInstance, IAttributeValueInstance, ICategoryInstance, IChannelInstance, ICustomerInstance, IOrderInstance, IOrderItemInstance, IProductCategoryInsance, IProductInstance, IUserInstance } from './tables';
import { operatorsAliases } from './operator-aliases'

export interface IDatabase {
    dbModels: DatabaseModels;
    authenticate(): Promise<void>;
}

@singletonNamedProvide(TYPES.DATABASE, NAMES.POSTGRES)
export class PostgresDatabase {
    private conn: Sequelize;
    public dbModels: DatabaseModels;

    get id() {
        return NAMES.POSTGRES
    }

    get connection() {
        return this.conn
    }

    constructor(
        @inject(TYPES.CONFIG) protected config: IConfiguration,
        @inject(TYPES.LOGGER) protected logger: ILogger,


        @namedInject(TYPES.DATABASE, API_DOMAIN.USER)
        protected userModel: IBasePostgresTable<IUserDomain, IUserInstance>,

        @namedInject(TYPES.DATABASE, API_DOMAIN.PRODUCT)
        protected productModel: IBasePostgresTable<IProductDomain, IProductInstance>,

        @namedInject(TYPES.DATABASE, API_DOMAIN.CATEGORY)
        protected categoryModel: IBasePostgresTable<ICategoryDomain, ICategoryInstance>,

        @namedInject(TYPES.DATABASE, API_DOMAIN.ATTRIBUTE)
        protected attributeModel: IBasePostgresTable<IAttributeDomain, IAttributeInstance>,

        @namedInject(TYPES.DATABASE, API_DOMAIN.PRODUCT_CATEGORY)
        protected productCaterogyModel: IBasePostgresTable<IProductCategoryDomain, IProductCategoryInsance>,

        @namedInject(TYPES.DATABASE, API_DOMAIN.CUSTOMER)
        protected customerModel: IBasePostgresTable<ICustomerDomain, ICustomerInstance>,

        @namedInject(TYPES.DATABASE, API_DOMAIN.ORDER)
        protected orderModel: IBasePostgresTable<IOrderDomain, IOrderInstance>,

        @namedInject(TYPES.DATABASE, API_DOMAIN.ORDER_ITEM)
        protected orderItemModel: IBasePostgresTable<IOrderItemDomain, IOrderItemInstance>,

        @namedInject(TYPES.DATABASE, API_DOMAIN.ATTRIBUTE_VALUE)
        protected attributeValueModel: IBasePostgresTable<IAttributeValueDomain, IAttributeValueInstance>,

        @namedInject(TYPES.DATABASE, API_DOMAIN.CHANNEL)
        protected channelModel: IBasePostgresTable<IChannelDomain, IChannelInstance>,
    ) {
        const dbConfig = {
            ...this.config.get('postgres.info.write'),
            operatorsAliases
        }

        try {

            this.conn = new Sequelize(dbConfig)
            this.initialModels()

        } catch (err) {
            process.exit()
        }
    }

    get log(): ILog {
        const databaseLogger = Symbol.keyFor(LOGGER.INFRASTRUCTURE)
        const id = Symbol.keyFor(this.id)

        return this.logger.get(databaseLogger, id)
    }

    public authenticate() {
        this.conn.authenticate()
        this.sync()
    }

    public sync() {
        return this.conn.sync({ force: true })
    }

    private initialModels() {
        const dbModels: DatabaseModels = {
            user: this.userModel.define(this.conn),
            product: this.productModel.define(this.conn),
            category: this.categoryModel.define(this.conn),
            attribute: this.attributeModel.define(this.conn),
            attributeValue: this.attributeValueModel.define(this.conn),
            productCategory: this.productCaterogyModel.define(this.conn),
            customer: this.customerModel.define(this.conn),
            order: this.orderModel.define(this.conn),
            orderItem: this.orderItemModel.define(this.conn),
            channel: this.channelModel.define(this.conn)
        }

        this.dbModels = dbModels
    }
}