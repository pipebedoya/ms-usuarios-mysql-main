import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Usuarioxrol} from '../models';
import {UsuarioxrolRepository} from './usuarioxrol.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly tiene_muchos: HasManyRepositoryFactory<Usuarioxrol, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('UsuarioxrolRepository') protected usuarioxrolRepositoryGetter: Getter<UsuarioxrolRepository>,
  ) {
    super(Usuario, dataSource);
    this.tiene_muchos = this.createHasManyRepositoryFactoryFor('tiene_muchos', usuarioxrolRepositoryGetter,);
    this.registerInclusionResolver('tiene_muchos', this.tiene_muchos.inclusionResolver);
  }
}
