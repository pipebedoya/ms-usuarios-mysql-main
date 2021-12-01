import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Permisos, PermisosRelations, Rolxpermisos} from '../models';
import {RolxpermisosRepository} from './rolxpermisos.repository';

export class PermisosRepository extends DefaultCrudRepository<
  Permisos,
  typeof Permisos.prototype.id,
  PermisosRelations
> {

  public readonly tiene_muchos: HasManyRepositoryFactory<Rolxpermisos, typeof Permisos.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('RolxpermisosRepository') protected rolxpermisosRepositoryGetter: Getter<RolxpermisosRepository>,
  ) {
    super(Permisos, dataSource);
    this.tiene_muchos = this.createHasManyRepositoryFactoryFor('tiene_muchos', rolxpermisosRepositoryGetter,);
    this.registerInclusionResolver('tiene_muchos', this.tiene_muchos.inclusionResolver);
  }
}
