import {Entity, hasMany, model, property} from '@loopback/repository';
import {Rolxpermisos} from './rolxpermisos.model';

@model()
export class Permisos extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @hasMany(() => Rolxpermisos, {keyTo: 'id_permiso'})
  tiene_muchos: Rolxpermisos[];

  constructor(data?: Partial<Permisos>) {
    super(data);
  }
}

export interface PermisosRelations {
  // describe navigational properties here
}

export type PermisosWithRelations = Permisos & PermisosRelations;
