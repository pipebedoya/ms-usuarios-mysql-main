import {Entity, model, property, hasMany} from '@loopback/repository';
import {Usuarioxrol} from './usuarioxrol.model';
import {Rolxpermisos} from './rolxpermisos.model';

@model()
export class Rol extends Entity {
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

  @hasMany(() => Usuarioxrol, {keyTo: 'id_rol'})
  tiene_muchos: Usuarioxrol[];

  @hasMany(() => Rolxpermisos, {keyTo: 'id_rol'})
  tiene_varios: Rolxpermisos[];

  constructor(data?: Partial<Rol>) {
    super(data);
  }
}

export interface RolRelations {
  // describe navigational properties here
}

export type RolWithRelations = Rol & RolRelations;
