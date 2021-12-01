import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Rolxpermisos, RolxpermisosRelations, Rol, Permisos} from '../models';
import {RolRepository} from './rol.repository';
import {PermisosRepository} from './permisos.repository';

export class RolxpermisosRepository extends DefaultCrudRepository<
  Rolxpermisos,
  typeof Rolxpermisos.prototype.id,
  RolxpermisosRelations
> {

  public readonly tiene_un: BelongsToAccessor<Rol, typeof Rolxpermisos.prototype.id>;

  public readonly pertenece_a: BelongsToAccessor<Permisos, typeof Rolxpermisos.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>, @repository.getter('PermisosRepository') protected permisosRepositoryGetter: Getter<PermisosRepository>,
  ) {
    super(Rolxpermisos, dataSource);
    this.pertenece_a = this.createBelongsToAccessorFor('pertenece_a', permisosRepositoryGetter,);
    this.registerInclusionResolver('pertenece_a', this.pertenece_a.inclusionResolver);
    this.tiene_un = this.createBelongsToAccessorFor('tiene_un', rolRepositoryGetter,);
    this.registerInclusionResolver('tiene_un', this.tiene_un.inclusionResolver);
  }
}
