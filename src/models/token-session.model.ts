import {Model, model, property} from '@loopback/repository';

@model()
export class TokenSession extends Model {
  @property({
    type: 'string',
  })
  token?: string;


  constructor(data?: Partial<TokenSession>) {
    super(data);
  }
}

export interface TokenSessionRelations {
  // describe navigational properties here
}

export type TokenSessionWithRelations = TokenSession & TokenSessionRelations;
