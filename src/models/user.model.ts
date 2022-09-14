import {Entity, hasOne, model, property} from '@loopback/repository';
import {Customer} from './customer.model';
import {Roles} from './roles.model';

enum UserRole {
  SuperAdmin,
  Admin,
  Subscriber,
}

@model({
  settings: {
    postgresql: {schema: 'public', table: 'users'},
  },
})
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    // generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
  })
  middleName?: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'string',
  })
  phoneNumber?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'number',
  })
  role?: UserRole;

  @hasOne(() => Customer)
  customer: Customer;

  @hasOne(() => Roles)
  roles: Roles;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
