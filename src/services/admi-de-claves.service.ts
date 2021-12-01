import { /* inject, */ BindingScope, injectable, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Configuracion} from '../keys/configuracion';
import {CambioClave} from '../models/cambio-clave.model';
import {CredencialesRecuperarClave} from '../models/credenciales-recuperar-clave.model';
import {NotificacionSms} from '../models/notificacion-sms.model';
import {UsuarioRepository} from '../repositories/usuario.repository';
import {NotificacionesService} from './notificaciones.service';
const generator = require('generate-password');
const cryptoJS = require("crypto-js");

@injectable({scope: BindingScope.TRANSIENT})
export class AdmiDeClavesService {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
    @service(NotificacionesService)
    public notiService: NotificacionesService
  ) { }

  /*
   * Add service methods here
   */
  async recuperarClave(credenciales: CredencialesRecuperarClave) {
    let usuario = await this.usuarioRepository.findOne({
      where: {
        correo: credenciales.correo
      }
    });
    if (usuario) {
      let claveRecuperada = this.crearClaveAleatoria();
      //console.log(claveRecuperada);
      usuario.contrasenia = this.cifrarTexto(claveRecuperada);
      await this.usuarioRepository.updateById(usuario.id, usuario);
      //notificar la nueva contraseña por correo;
      let datos = new NotificacionSms();
      datos.destino = usuario.celular;
      datos.mensaje = `${Configuracion.saludo} ${usuario.nombre} ${Configuracion.mensajeRecuperarClave} ${claveRecuperada} `
      this.notiService.NotificacionSms(datos);
      return usuario
    }
  }

  async cambiarClave(credencialesClave: CambioClave) {
    let usuario = await this.usuarioRepository.findOne({
      where: {
        id: credencialesClave.id_usuario,
        contrasenia: credencialesClave.clave_actual
      }
    });
    if (usuario) {
      usuario.contrasenia = credencialesClave.clave_nueva;
      await this.usuarioRepository.updateById(credencialesClave.id_usuario, usuario);
      return usuario;
    } else {
      return null;
    }
  }

  crearClaveAleatoria(): string {
    let password: string = generator.generate({
      length: 10,
      numbers: true
    });
    return password;
  }

  cifrarTexto(texto: string): string {
    let encryptedTexto: string = cryptoJS.MD5(texto).toString();
    return encryptedTexto;
  }

}
