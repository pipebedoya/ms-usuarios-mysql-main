import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Rol, RolRelations, Usuarioxrol, Rolxpermisos} from '../models';
import {UsuarioxrolRepository} from './usuarioxrol.repository';
import {RolxpermisosRepository} from './rolxpermisos.repository';

export class RolRepository extends DefaultCrudRepository<
  Rol,
  typeof Rol.prototype.id,
  RolRelations
> {

  public readonly tiene_muchos: HasManyRepositoryFactory<Usuarioxrol, typeof Rol.prototype.id>;

  public readonly tiene_varios: HasManyRepositoryFactory<Rolxpermisos, typeof Rol.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('UsuarioxrolRepository') protected usuarioxrolRepositoryGetter: Getter<UsuarioxrolRepository>, @repository.getter('RolxpermisosRepository') protected rolxpermisosRepositoryGetter: Getter<RolxpermisosRepository>,
  ) {
    super(Rol, dataSource);
    this.tiene_varios = this.createHasManyRepositoryFactoryFor('tiene_varios', rolxpermisosRepositoryGetter,);
    this.registerInclusionResolver('tiene_varios', this.tiene_varios.inclusionResolver);
    this.tiene_muchos = this.createHasManyRepositoryFactoryFor('tiene_muchos', usuarioxrolRepositoryGetter,);
    this.registerInclusionResolver('tiene_muchos', this.tiene_muchos.inclusionResolver);
  }
}
