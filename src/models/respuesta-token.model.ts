import {Model, model, property} from '@loopback/repository';

@model()
export class RespuestaToken extends Model {
  @property({
    type: 'number',
  })
  id_usuario?: number;

  @property({
    type: 'string',
  })
  nombre?: string;

  @property({
    type: 'number',
  })
  rol?: number;


  constructor(data?: Partial<RespuestaToken>) {
    super(data);
  }
}

export interface RespuestaTokenRelations {
  // describe navigational properties here
}

export type RespuestaTokenWithRelations = RespuestaToken & RespuestaTokenRelations;
