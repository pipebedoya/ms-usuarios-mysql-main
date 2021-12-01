import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Rolxpermisos} from '../models';
import {RolxpermisosRepository} from '../repositories';

export class RolxpermisosController {
  constructor(
    @repository(RolxpermisosRepository)
    public rolxpermisosRepository : RolxpermisosRepository,
  ) {}

  @post('/rolxpermisos')
  @response(200, {
    description: 'Rolxpermisos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Rolxpermisos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rolxpermisos, {
            title: 'NewRolxpermisos',
            exclude: ['id'],
          }),
        },
      },
    })
    rolxpermisos: Omit<Rolxpermisos, 'id'>,
  ): Promise<Rolxpermisos> {
    return this.rolxpermisosRepository.create(rolxpermisos);
  }

  @get('/rolxpermisos/count')
  @response(200, {
    description: 'Rolxpermisos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Rolxpermisos) where?: Where<Rolxpermisos>,
  ): Promise<Count> {
    return this.rolxpermisosRepository.count(where);
  }

  @get('/rolxpermisos')
  @response(200, {
    description: 'Array of Rolxpermisos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Rolxpermisos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Rolxpermisos) filter?: Filter<Rolxpermisos>,
  ): Promise<Rolxpermisos[]> {
    return this.rolxpermisosRepository.find(filter);
  }

  @patch('/rolxpermisos')
  @response(200, {
    description: 'Rolxpermisos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rolxpermisos, {partial: true}),
        },
      },
    })
    rolxpermisos: Rolxpermisos,
    @param.where(Rolxpermisos) where?: Where<Rolxpermisos>,
  ): Promise<Count> {
    return this.rolxpermisosRepository.updateAll(rolxpermisos, where);
  }

  @get('/rolxpermisos/{id}')
  @response(200, {
    description: 'Rolxpermisos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Rolxpermisos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Rolxpermisos, {exclude: 'where'}) filter?: FilterExcludingWhere<Rolxpermisos>
  ): Promise<Rolxpermisos> {
    return this.rolxpermisosRepository.findById(id, filter);
  }

  @patch('/rolxpermisos/{id}')
  @response(204, {
    description: 'Rolxpermisos PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rolxpermisos, {partial: true}),
        },
      },
    })
    rolxpermisos: Rolxpermisos,
  ): Promise<void> {
    await this.rolxpermisosRepository.updateById(id, rolxpermisos);
  }

  @put('/rolxpermisos/{id}')
  @response(204, {
    description: 'Rolxpermisos PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() rolxpermisos: Rolxpermisos,
  ): Promise<void> {
    await this.rolxpermisosRepository.replaceById(id, rolxpermisos);
  }

  @del('/rolxpermisos/{id}')
  @response(204, {
    description: 'Rolxpermisos DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.rolxpermisosRepository.deleteById(id);
  }
}
