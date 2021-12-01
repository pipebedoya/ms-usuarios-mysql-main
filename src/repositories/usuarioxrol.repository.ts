import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Usuarioxrol, UsuarioxrolRelations, Usuario, Rol} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {RolRepository} from './rol.repository';

export class UsuarioxrolRepository extends DefaultCrudRepository<
  Usuarioxrol,
  typeof Usuarioxrol.prototype.id,
  UsuarioxrolRelations
> {

  public readonly tiene_un: BelongsToAccessor<Usuario, typeof Usuarioxrol.prototype.id>;

  public readonly pertenece_a: BelongsToAccessor<Rol, typeof Usuarioxrol.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>,
  ) {
    super(Usuarioxrol, dataSource);
    this.pertenece_a = this.createBelongsToAccessorFor('pertenece_a', rolRepositoryGetter,);
    this.registerInclusionResolver('pertenece_a', this.pertenece_a.inclusionResolver);
    this.tiene_un = this.createBelongsToAccessorFor('tiene_un', usuarioRepositoryGetter,);
    this.registerInclusionResolver('tiene_un', this.tiene_un.inclusionResolver);
  }
}
