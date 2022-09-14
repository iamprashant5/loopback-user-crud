import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Roles,
  User,
} from '../models';
import {RolesRepository} from '../repositories';

export class RolesUserController {
  constructor(
    @repository(RolesRepository)
    public rolesRepository: RolesRepository,
  ) { }

  @get('/roles/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Roles',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof Roles.prototype.id,
  ): Promise<User> {
    return this.rolesRepository.user(id);
  }
}
