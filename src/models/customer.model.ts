import {belongsTo, Entity, model, property} from '@loopback/repository';
import {User} from './user.model';

@model({
  settings: {
    foreignKeys: {
      fk_customer_userId: {
        name: 'fk_customer_userId',
        entity: 'User',
        entityKey: 'id',
        foreignKey: 'userid',
      },
    },
    postgresql: {schema: 'public', table: 'customers'},
  },
})
export class Customer extends Entity {
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
    type: 'string',
    required: true,
  })
  website: string;

  @property({
    type: 'string',
  })
  address?: string;

  @belongsTo(() => User)
  userId: number;

  constructor(data?: Partial<Customer>) {
    super(data);
  }
}

export interface CustomerRelations {
  // describe navigational properties here
}

export type CustomerWithRelations = Customer & CustomerRelations;
