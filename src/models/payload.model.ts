import {Model, model, property} from '@loopback/repository';

@model()
export class Payload extends Model {
  @property({
    type: 'string',
  })
  id_usuario: string;

  @property({
    type: 'string',
  })
  nombre: string;

  @property({
    type: 'string',
  })
  rol: string;


  @property({
    type: 'boolean',
    default: true
  })
  ok?: boolean;

  constructor(data?: Partial<Payload>) {
    super(data);
  }
}

export interface PayloadRelations {
  // describe navigational properties here
}

export type PayloadWithRelations = Payload & PayloadRelations;
