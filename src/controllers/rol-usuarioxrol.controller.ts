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
  Rol,
  Usuarioxrol,
} from '../models';
import {RolRepository} from '../repositories';

export class RolUsuarioxrolController {
  constructor(
    @repository(RolRepository) protected rolRepository: RolRepository,
  ) { }

  @get('/rols/{id}/usuarioxrols', {
    responses: {
      '200': {
        description: 'Array of Rol has many Usuarioxrol',
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
    return this.rolRepository.tiene_muchos(id).find(filter);
  }

  @post('/rols/{id}/usuarioxrols', {
    responses: {
      '200': {
        description: 'Rol model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuarioxrol)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Rol.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarioxrol, {
            title: 'NewUsuarioxrolInRol',
            exclude: ['id'],
            optional: ['id_rol']
          }),
        },
      },
    }) usuarioxrol: Omit<Usuarioxrol, 'id'>,
  ): Promise<Usuarioxrol> {
    return this.rolRepository.tiene_muchos(id).create(usuarioxrol);
  }

  @patch('/rols/{id}/usuarioxrols', {
    responses: {
      '200': {
        description: 'Rol.Usuarioxrol PATCH success count',
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
    return this.rolRepository.tiene_muchos(id).patch(usuarioxrol, where);
  }

  @del('/rols/{id}/usuarioxrols', {
    responses: {
      '200': {
        description: 'Rol.Usuarioxrol DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Usuarioxrol)) where?: Where<Usuarioxrol>,
  ): Promise<Count> {
    return this.rolRepository.tiene_muchos(id).delete(where);
  }
}
