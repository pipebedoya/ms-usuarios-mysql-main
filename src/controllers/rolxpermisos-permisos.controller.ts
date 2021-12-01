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
  Permisos,
} from '../models';
import {RolxpermisosRepository} from '../repositories';

export class RolxpermisosPermisosController {
  constructor(
    @repository(RolxpermisosRepository)
    public rolxpermisosRepository: RolxpermisosRepository,
  ) { }

  @get('/rolxpermisos/{id}/permisos', {
    responses: {
      '200': {
        description: 'Permisos belonging to Rolxpermisos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Permisos)},
          },
        },
      },
    },
  })
  async getPermisos(
    @param.path.number('id') id: typeof Rolxpermisos.prototype.id,
  ): Promise<Permisos> {
    return this.rolxpermisosRepository.pertenece_a(id);
  }
}
