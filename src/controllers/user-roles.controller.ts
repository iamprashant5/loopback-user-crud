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
  User,
  Roles,
} from '../models';
import {UserRepository} from '../repositories';

export class UserRolesController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/roles', {
    responses: {
      '200': {
        description: 'User has one Roles',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Roles),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Roles>,
  ): Promise<Roles> {
    return this.userRepository.roles(id).get(filter);
  }

  @post('/users/{id}/roles', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Roles)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Roles, {
            title: 'NewRolesInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) roles: Omit<Roles, 'id'>,
  ): Promise<Roles> {
    return this.userRepository.roles(id).create(roles);
  }

  @patch('/users/{id}/roles', {
    responses: {
      '200': {
        description: 'User.Roles PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Roles, {partial: true}),
        },
      },
    })
    roles: Partial<Roles>,
    @param.query.object('where', getWhereSchemaFor(Roles)) where?: Where<Roles>,
  ): Promise<Count> {
    return this.userRepository.roles(id).patch(roles, where);
  }

  @del('/users/{id}/roles', {
    responses: {
      '200': {
        description: 'User.Roles DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Roles)) where?: Where<Roles>,
  ): Promise<Count> {
    return this.userRepository.roles(id).delete(where);
  }
}
