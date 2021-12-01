import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Permisos} from './permisos.model';
import {Rol} from './rol.model';

@model({
  settings: {
    foreignKeys: {
      fk_rol: {
        name: 'fk_rol',
        entity: 'Rol',
        entityKey: 'id',
        foreignKey: 'id_rol'
      },
      fk_permisos: {
        name: 'fk_permisos',
        entity: 'Permisos',
        entityKey: 'id',
        foreignKey: 'id_permiso'
      }
    }
  }
})
export class Rolxpermisos extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => Rol, {name: 'tiene_un'})
  id_rol: number;

  @belongsTo(() => Permisos, {name: 'pertenece_a'})
  id_permiso: number;

  constructor(data?: Partial<Rolxpermisos>) {
    super(data);
  }
}

export interface RolxpermisosRelations {
  // describe navigational properties here
}

export type RolxpermisosWithRelations = Rolxpermisos & RolxpermisosRelations;
