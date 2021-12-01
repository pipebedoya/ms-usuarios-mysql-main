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
  Rolxpermisos,
} from '../models';
import {RolRepository} from '../repositories';

export class RolRolxpermisosController {
  constructor(
    @repository(RolRepository) protected rolRepository: RolRepository,
  ) { }

  @get('/rols/{id}/rolxpermisos', {
    responses: {
      '200': {
        description: 'Array of Rol has many Rolxpermisos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Rolxpermisos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Rolxpermisos>,
  ): Promise<Rolxpermisos[]> {
    return this.rolRepository.tiene_varios(id).find(filter);
  }

  @post('/rols/{id}/rolxpermisos', {
    responses: {
      '200': {
        description: 'Rol model instance',
        content: {'application/json': {schema: getModelSchemaRef(Rolxpermisos)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Rol.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rolxpermisos, {
            title: 'NewRolxpermisosInRol',
            exclude: ['id'],
            optional: ['id_rol']
          }),
        },
      },
    }) rolxpermisos: Omit<Rolxpermisos, 'id'>,
  ): Promise<Rolxpermisos> {
    return this.rolRepository.tiene_varios(id).create(rolxpermisos);
  }

  @patch('/rols/{id}/rolxpermisos', {
    responses: {
      '200': {
        description: 'Rol.Rolxpermisos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rolxpermisos, {partial: true}),
        },
      },
    })
    rolxpermisos: Partial<Rolxpermisos>,
    @param.query.object('where', getWhereSchemaFor(Rolxpermisos)) where?: Where<Rolxpermisos>,
  ): Promise<Count> {
    return this.rolRepository.tiene_varios(id).patch(rolxpermisos, where);
  }

  @del('/rols/{id}/rolxpermisos', {
    responses: {
      '200': {
        description: 'Rol.Rolxpermisos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Rolxpermisos)) where?: Where<Rolxpermisos>,
  ): Promise<Count> {
    return this.rolRepository.tiene_varios(id).delete(where);
  }
}
