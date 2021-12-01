import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {Configuracion} from '../keys/configuracion';
import {Credenciales} from '../models/credenciales.model';
import {TokenSession} from '../models/token-session.model';
import {Usuario} from '../models/usuario.model';
import {Usuarioxrol} from '../models/usuarioxrol.model';
import {UsuarioRepository} from '../repositories/usuario.repository';
const fetch = require('node-fetch');

@injectable({scope: BindingScope.TRANSIENT})
export class UsuariosService {
  constructor(
    @repository(UsuarioRepository)
    public UsuarioRepository: UsuarioRepository
  ) { }

  /*
   * Add service methods here
   */


  async validarCredenciales(credenciales: Credenciales) {

    let usuario = await this.UsuarioRepository.findOne({
      where: {
        correo: credenciales.usuario,
        contrasenia: credenciales.clave
      }
    });
    if (usuario?.correo != credenciales.usuario) {
      throw new HttpErrors[400](`usuario o clave invalida revise nuevamente`);
    }
    return usuario;
  }


  async crearToken(datosUser: Usuario, datosUserxRol: Usuarioxrol): Promise<string> {
    let urlToken = `${Configuracion.urlCrearToken}?${Configuracion.nombreArg}=${datosUser.nombre}&${Configuracion.idUserArg}=${datosUserxRol.id_usuario}&${Configuracion.idRolArg}=${datosUserxRol.id_rol}`
    let tk = "";
    //console.log(tk);
    await fetch(urlToken)
      .then(async (res: any) => {
        tk = await res.text();
      })
    //console.log(tk);
    return tk;
  }

  async validarToken(token: TokenSession): Promise<Object> {
    let ok = false;
    //console.log('desde validartoken', token.token);
    try {
      let urlTokenSession = `${Configuracion.urlValidarSession}?${Configuracion.tokenArg}=${token.token}`
      const resp = await fetch(urlTokenSession);
      const data = await resp.json();
      return {
        ok: true,
        data, token
      }

    } catch (err) {
      throw new HttpErrors[401](`unauthorized`);
    }
  }


}
