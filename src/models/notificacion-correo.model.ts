import {Model, model, property} from '@loopback/repository';

@model()
export class NotificacionCorreo extends Model {
  @property({
    type: 'string',
    required: true,
  })
  destino: string;

  @property({
    type: 'string',
    required: true,
  })
  asunto: string;

  @property({
    type: 'string',
    required: true,
  })
  mensaje: string;


  constructor(data?: Partial<NotificacionCorreo>) {
    super(data);
  }
}

export interface NotificacionCorreoRelations {
  // describe navigational properties here
}

export type NotificacionCorreoWithRelations = NotificacionCorreo & NotificacionCorreoRelations;
