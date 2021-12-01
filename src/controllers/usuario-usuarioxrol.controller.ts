import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Usuario,
  Usuarioxrol,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioUsuarioxrolController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/usuarioxrols', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Usuarioxrol',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuarioxrol)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Usuarioxrol>,
  ): Promise<Usuarioxrol[]> {
    return this.usuarioRepository.tiene_muchos(id).find(filter);
  }

  @post('/usuarios/{id}/usuarioxrols', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuarioxrol)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarioxrol, {
            title: 'NewUsuarioxrolInUsuario',
            exclude: ['id'],
            optional: ['id_usuario']
          }),
        },
      },
    }) usuarioxrol: Omit<Usuarioxrol, 'id'>,
  ): Promise<Usuarioxrol> {
    return this.usuarioRepository.tiene_muchos(id).create(usuarioxrol);
  }

  @patch('/usuarios/{id}/usuarioxrols', {
    responses: {
      '200': {
        description: 'Usuario.Usuarioxrol PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarioxrol, {partial: true}),
        },
      },
    })
    usuarioxrol: Partial<Usuarioxrol>,
    @param.query.object('where', getWhereSchemaFor(Usuarioxrol)) where?: Where<Usuarioxrol>,
  ): Promise<Count> {
    return this.usuarioRepository.tiene_muchos(id).patch(usuarioxrol, where);
  }

  @del('/usuarios/{id}/usuarioxrols', {
    responses: {
      '200': {
        description: 'Usuario.Usuarioxrol DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Usuarioxrol)) where?: Where<Usuarioxrol>,
  ): Promise<Count> {
    return this.usuarioRepository.tiene_muchos(id).delete(where);
  }
}
