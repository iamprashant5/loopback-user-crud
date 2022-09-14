import {belongsTo, Entity, model, property} from '@loopback/repository';
import {User} from './user.model';

@model({
  settings: {
    foreignKeys: {
      fk_roles_userId: {
        name: 'fk_roles_userId',
        entity: 'User',
        entityKey: 'id',
        foreignKey: 'userid',
      },
    },
    postgresql: {schema: 'public', table: 'roles'},
  },
})
export class Roles extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  key: number;

  @belongsTo(() => User)
  userId: number;

  constructor(data?: Partial<Roles>) {
    super(data);
  }
}

export interface RolesRelations {
  // describe navigational properties here
}

export type RolesWithRelations = Roles & RolesRelations;
