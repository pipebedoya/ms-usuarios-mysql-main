import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Usuarioxrol,
  Rol,
} from '../models';
import {UsuarioxrolRepository} from '../repositories';

export class UsuarioxrolRolController {
  constructor(
    @repository(UsuarioxrolRepository)
    public usuarioxrolRepository: UsuarioxrolRepository,
  ) { }

  @get('/usuarioxrols/{id}/rol', {
    responses: {
      '200': {
        description: 'Rol belonging to Usuarioxrol',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Rol)},
          },
        },
      },
    },
  })
  async getRol(
    @param.path.number('id') id: typeof Usuarioxrol.prototype.id,
  ): Promise<Rol> {
    return this.usuarioxrolRepository.pertenece_a(id);
  }
}
