import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasOneRepositoryFactory,
  repository,
} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Customer, User, UserRelations, Roles} from '../models';
import {CustomerRepository} from './customer.repository';
import {RolesRepository} from './roles.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly customer: HasOneRepositoryFactory<
    Customer,
    typeof User.prototype.id
  >;

  public readonly roles: HasOneRepositoryFactory<Roles, typeof User.prototype.id>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
    @repository.getter('CustomerRepository')
    protected customerRepositoryGetter: Getter<CustomerRepository>, @repository.getter('RolesRepository') protected rolesRepositoryGetter: Getter<RolesRepository>,
  ) {
    super(User, dataSource);
    this.roles = this.createHasOneRepositoryFactoryFor('roles', rolesRepositoryGetter);
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);
    this.customer = this.createHasOneRepositoryFactoryFor(
      'customer',
      customerRepositoryGetter,
    );
    this.registerInclusionResolver('customer', this.customer.inclusionResolver);
  }
}
