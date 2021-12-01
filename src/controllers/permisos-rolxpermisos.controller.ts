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
  Permisos,
  Rolxpermisos,
} from '../models';
import {PermisosRepository} from '../repositories';

export class PermisosRolxpermisosController {
  constructor(
    @repository(PermisosRepository) protected permisosRepository: PermisosRepository,
  ) { }

  @get('/permisos/{id}/rolxpermisos', {
    responses: {
      '200': {
        description: 'Array of Permisos has many Rolxpermisos',
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
    return this.permisosRepository.tiene_muchos(id).find(filter);
  }

  @post('/permisos/{id}/rolxpermisos', {
    responses: {
      '200': {
        description: 'Permisos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Rolxpermisos)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Permisos.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rolxpermisos, {
            title: 'NewRolxpermisosInPermisos',
            exclude: ['id'],
            optional: ['id_permiso']
          }),
        },
      },
    }) rolxpermisos: Omit<Rolxpermisos, 'id'>,
  ): Promise<Rolxpermisos> {
    return this.permisosRepository.tiene_muchos(id).create(rolxpermisos);
  }

  @patch('/permisos/{id}/rolxpermisos', {
    responses: {
      '200': {
        description: 'Permisos.Rolxpermisos PATCH success count',
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
    return this.permisosRepository.tiene_muchos(id).patch(rolxpermisos, where);
  }

  @del('/permisos/{id}/rolxpermisos', {
    responses: {
      '200': {
        description: 'Permisos.Rolxpermisos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Rolxpermisos)) where?: Where<Rolxpermisos>,
  ): Promise<Count> {
    return this.permisosRepository.tiene_muchos(id).delete(where);
  }
}
