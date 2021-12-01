import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Usuarioxrol} from '../models';
import {UsuarioxrolRepository} from '../repositories';

export class UsuarioxrolController {
  constructor(
    @repository(UsuarioxrolRepository)
    public usuarioxrolRepository: UsuarioxrolRepository,
  ) { }

  @post('/usuarioxroles')
  @response(200, {
    description: 'Usuarioxrol model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuarioxrol)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarioxrol, {
            title: 'NewUsuarioxrol',
            exclude: ['id'],
          }),
        },
      },
    })
    usuarioxrol: Omit<Usuarioxrol, 'id'>,
  ): Promise<Usuarioxrol> {
    return this.usuarioxrolRepository.create(usuarioxrol);
  }

  @get('/usuarioxroles/count')
  @response(200, {
    description: 'Usuarioxrol model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usuarioxrol) where?: Where<Usuarioxrol>,
  ): Promise<Count> {
    return this.usuarioxrolRepository.count(where);
  }

  @get('/usuarioxroles')
  @response(200, {
    description: 'Array of Usuarioxrol model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuarioxrol, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuarioxrol) filter?: Filter<Usuarioxrol>,
  ): Promise<Usuarioxrol[]> {
    return this.usuarioxrolRepository.find(filter);
  }

  @patch('/usuarioxroles')
  @response(200, {
    description: 'Usuarioxrol PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarioxrol, {partial: true}),
        },
      },
    })
    usuarioxrol: Usuarioxrol,
    @param.where(Usuarioxrol) where?: Where<Usuarioxrol>,
  ): Promise<Count> {
    return this.usuarioxrolRepository.updateAll(usuarioxrol, where);
  }

  @get('/usuarioxroles/{id}')
  @response(200, {
    description: 'Usuarioxrol model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuarioxrol, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Usuarioxrol, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuarioxrol>
  ): Promise<Usuarioxrol> {
    return this.usuarioxrolRepository.findById(id, filter);
  }

  @patch('/usuarioxroles/{id}')
  @response(204, {
    description: 'Usuarioxrol PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarioxrol, {partial: true}),
        },
      },
    })
    usuarioxrol: Usuarioxrol,
  ): Promise<void> {
    await this.usuarioxrolRepository.updateById(id, usuarioxrol);
  }

  @put('/usuarioxroles/{id}')
  @response(204, {
    description: 'Usuarioxrol PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() usuarioxrol: Usuarioxrol,
  ): Promise<void> {
    await this.usuarioxrolRepository.replaceById(id, usuarioxrol);
  }

  @del('/usuarioxroles/{id}')
  @response(204, {
    description: 'Usuarioxrol DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.usuarioxrolRepository.deleteById(id);
  }
}
