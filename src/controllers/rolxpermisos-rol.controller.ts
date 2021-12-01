import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Rolxpermisos,
  Rol,
} from '../models';
import {RolxpermisosRepository} from '../repositories';

export class RolxpermisosRolController {
  constructor(
    @repository(RolxpermisosRepository)
    public rolxpermisosRepository: RolxpermisosRepository,
  ) { }

  @get('/rolxpermisos/{id}/rol', {
    responses: {
      '200': {
        description: 'Rol belonging to Rolxpermisos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Rol)},
          },
        },
      },
    },
  })
  async getRol(
    @param.path.number('id') id: typeof Rolxpermisos.prototype.id,
  ): Promise<Rol> {
    return this.rolxpermisosRepository.tiene_un(id);
  }
}
