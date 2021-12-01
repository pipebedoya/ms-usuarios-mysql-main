import {Model, model, property} from '@loopback/repository';

@model()
export class CambioClave extends Model {
  @property({
    type: 'number',
    required: true,
  })
  id_usuario: number;

  @property({
    type: 'string',
    required: true,
  })
  clave_actual: string;

  @property({
    type: 'string',
    required: true,
  })
  clave_nueva: string;


  constructor(data?: Partial<CambioClave>) {
    super(data);
  }
}

export interface CambioClaveRelations {
  // describe navigational properties here
}

export type CambioClaveWithRelations = CambioClave & CambioClaveRelations;
