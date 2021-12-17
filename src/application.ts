import { BaseApplication } from './infrastructure/base/application/base.application'
import { NAMES, TYPES } from "./const";
import { IHttp } from "./infrastructure/http/http";
import { inject, namedInject, singletonNamedProvide } from './infrastructure/ioc'
import { Sequelize } from 'sequelize/types';
import { PostgresDatabase } from './infrastructure/database';

@singletonNamedProvide(TYPES.APPLICATION, NAMES.API)
export class ApiApplication extends BaseApplication {
    @inject(TYPES.HTTP)
    private http: IHttp | undefined;

    get id() {
        return TYPES.API;
    }

    @namedInject(TYPES.DATABASE, NAMES.POSTGRES)
    protected postgresDatabase: PostgresDatabase

    async load() {

        this.postgresDatabase.authenticate()

        this.log?.info("DB connected");
    }

    async start() {
        const port = Number(process.env.PORT) | (this.config?.get('web.port') as number);
        if(this.http) {
            this.http.listen(port)
        }
        this.log?.info(`SERVER LISTENING ${port}`)
    }
}