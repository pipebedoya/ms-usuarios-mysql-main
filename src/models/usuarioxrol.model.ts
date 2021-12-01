import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Rol} from './rol.model';
import {Usuario} from './usuario.model';

@model({
  settings: {
    foreignKeys: {
      usuario_fk: {
        name: 'fk_usuario',
        entity: 'Usuario',
        entityKey: 'id',
        foreignKey: 'id_usuario'
      },
      rol_fk: {
        name: 'fk_rol_',
        entity: 'Rol',
        entityKey: 'id',
        foreignKey: 'id_rol'
      }
    }
  }
})
export class Usuarioxrol extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => Usuario, {name: 'tiene_un'})
  id_usuario: number;

  @belongsTo(() => Rol, {name: 'pertenece_a'})
  id_rol: number;

  constructor(data?: Partial<Usuarioxrol>) {
    super(data);
  }
}

export interface UsuarioxrolRelations {
  // describe navigational properties here
}

export type UsuarioxrolWithRelations = Usuarioxrol & UsuarioxrolRelations;
