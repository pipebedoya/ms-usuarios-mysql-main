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
  Usuario,
} from '../models';
import {UsuarioxrolRepository} from '../repositories';

export class UsuarioxrolUsuarioController {
  constructor(
    @repository(UsuarioxrolRepository)
    public usuarioxrolRepository: UsuarioxrolRepository,
  ) { }

  @get('/usuarioxrols/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Usuarioxrol',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.number('id') id: typeof Usuarioxrol.prototype.id,
  ): Promise<Usuario> {
    return this.usuarioxrolRepository.tiene_un(id);
  }
}
