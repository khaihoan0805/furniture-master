import { API_DOMAIN, NAMES, TYPES } from '../../../const';
import { IUserDomain, UserDomain } from '../../../domain';
import { DatabaseModel, IDatabase } from '../../database';
import { namedInject, singletonNamedProvide } from '../../ioc';
import { BasePostgresRepository, IDataMapper, IRepository } from '../base';
import { Operators } from '../type';
import { IUserMapper } from './user.mapper';

export interface IUserRepository extends IRepository<IUserDomain> {
    findByEmail(email: string, select?: string[]): Promise<IUserDomain>
}

@singletonNamedProvide(TYPES.REPOSITORY, API_DOMAIN.USER)
export class UserRepository extends BasePostgresRepository<IUserDomain> implements IUserRepository {
    model: DatabaseModel<IUserDomain>;
    
    @namedInject(TYPES.MAPPER, API_DOMAIN.USER)
    protected mapper: IUserMapper;

    constructor(
        @namedInject(TYPES.DATABASE, NAMES.POSTGRES)
        protected database: IDatabase
    ) {
        super(database)

        this.model = this.postgresDatabase.dbModels.user;
    }

    public async findByEmail(email: string, select?: string[]): Promise<IUserDomain> {
        const doc = await this.find({
            filters: [{ code: 'email', operator: Operators.Equals, value: email}],
            select,
            limit: 1
        })

        return doc.length > 0 ? this.mapper.toEntity(doc[0]) : undefined; 
    }
}