import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Configuracion} from '../keys/configuracion';
import {CambioClave, Credenciales, Usuario} from '../models';
import {CredencialesRecuperarClave} from '../models/credenciales-recuperar-clave.model';
import {NotificacionCorreo} from '../models/notificacion-correo.model';
import {TokenSession} from '../models/token-session.model';
import {UsuarioRepository} from '../repositories';
import {UsuarioxrolRepository} from '../repositories/usuarioxrol.repository';
import {AdmiDeClavesService} from '../services';
import {NotificacionesService} from '../services/notificaciones.service';
import {UsuariosService} from '../services/usuarios.service';


export class UsuarioController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
    @service(AdmiDeClavesService)
    public adminDeClavesService: AdmiDeClavesService,
    @service(NotificacionesService)
    public notiService: NotificacionesService,
    @service(UsuariosService)
    public userService: UsuariosService,
    @repository(UsuarioxrolRepository)
    public userxRolRepository: UsuarioxrolRepository,

  ) { }

  ////////////// CREAR USUARIO ///////////////////////////////////////////

  @authenticate("administrador")
  @post('/usuarios')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',
            exclude: ['id'],
          }),
        },
      },
    })
    usuario: Omit<Usuario, 'id'>,
  ): Promise<Usuario | boolean | string> {
    let clave = this.adminDeClavesService.crearClaveAleatoria();
    //console.log(clave);
    // Enviar clave por correo electronico
    let claveCifrada = this.adminDeClavesService.cifrarTexto(clave);
    //console.log(claveCifrada);
    usuario.contrasenia = claveCifrada;
    let usuarioVerificado = await this.usuarioRepository.findOne({
      where: {
        correo: usuario.correo
      }
    })
    if (!usuarioVerificado) {
      let usuarioCreado = await this.usuarioRepository.create(usuario);
      if (usuarioCreado) {
        // enviar clave por correo electronico
        let datos = new NotificacionCorreo();
        datos.destino = usuarioCreado.correo;
        datos.asunto = Configuracion.asuntoUsuarioCreado;
        datos.mensaje = `${Configuracion.saludo}
                       ${usuarioCreado.nombre}<br>
                       ${Configuracion.mensajeUsuarioCreado}
                       ${Configuracion.mensajeUsuarioCreadoClave}
                       ${clave}`
        this.notiService.enviarCorreo(datos);
        return true
      }
      return usuarioCreado;
    }
    return "el correo ya existe";
  }

  /**
   * Metodos adicionales a los generados por loopback
   */
  @post('/identificar-usuario')
  @response(200, {
    description: 'Identificacion de usuarios',
    content: {'application/json': {schema: getModelSchemaRef(Credenciales)}},
  })
  async identificarUsuario(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credenciales, {
            title: 'Identificar usuario'
          }),
        },
      },
    })
    credenciales: Credenciales,
  ): Promise<object | null | void> {
    let usuario = await this.userService.validarCredenciales(credenciales)
    let tk = "";
    if (usuario) {
      //generar token y agregarlo a la respuesta
      let usuarioxrol = await this.userxRolRepository.findOne({
        where: {
          id_usuario: usuario.id
        }
      });

      if (usuarioxrol) {
        //usuario.contrasenia = "";
        tk = await this.userService.crearToken(usuario, usuarioxrol);
        //console.log('aqui viene un token', tk);
        usuario.contrasenia = "";

        return {
          ok: true,
          tk, usuario, usuarioxrol
        }
      } else {
        throw new HttpErrors[400]('password invalido');
      }
      //return {usuarioxrol};
    }
    //console.log('que veo', tk);
    /* return {
      ok: false,
      mensaje: "password invalido"
    }; */
    /* else {
      //throw new Error(`no existe el usuario ${credenciales.usuario}`)
      if (credenciales.usuario ) {
        throw new HttpErrors[400](`no existe el usuario ${credenciales.usuario}`);
      } else if (credenciales.clave) {
        throw new HttpErrors[400](`no existe el usuario ${credenciales.clave}`);
      }

    } */
  }

  @post('/cambiar-clave')
  @response(200, {
    description: 'cambio de clave usuarios',
    content: {'application/json': {schema: getModelSchemaRef(CambioClave)}},
  })
  async cambiarClave(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CambioClave, {
            title: 'Cambio de clave del usuario'
          }),
        },
      },
    })
    credencialesClave: CambioClave,
  ): Promise<boolean | null> {
    let usuario = await this.adminDeClavesService.cambiarClave(credencialesClave);
    if (usuario) {
      //invocar al servicio de notificaciones para enviar correo al user
      let datos = new NotificacionCorreo();
      datos.destino = usuario.correo;
      datos.asunto = Configuracion.asuntoClave;
      datos.mensaje = `${Configuracion.saludo} ${usuario.nombre} <br> ${Configuracion.mensajeCambioClave}`
      this.notiService.enviarCorreo(datos);
    }
    return usuario != null;
  }


  @post('/recuperar-clave')
  @response(200, {
    description: 'cambio de clave usuarios',
    content: {'application/json': {schema: {}}},
  })
  async recuperarClave(
    @requestBody({
      content: {
        'application/json': {
          schema: {},
        },
      },
    })
    credenciales: CredencialesRecuperarClave,
  ): Promise<object | null | boolean> {
    let usuario = await this.adminDeClavesService.recuperarClave(credenciales);
    if (usuario) {
      //invocar al servicio de notificaciones para enviar sms al user con la nueva clave
      return {
        ok: true
      }
    } else {
      throw new HttpErrors[400](`el usuario ${credenciales.correo} no existe, verifique nuevamente`);
    }
  }

  @post('/validacion')
  @response(200, {
    description: 'Validacion de token',
    content: {'application/json': {schema: getModelSchemaRef(TokenSession)}},
  })
  async validarToken(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TokenSession, {
            title: 'validar usuario'
          }),
        },
      },
    })
    token: TokenSession,
  ): Promise<object | null | void> {
    console.log('aqui llega', token);
    if (token == null) {
      throw new HttpErrors[401](`unauthorized`);
    }
    let hayToken = await this.userService.validarToken(token)
    if (hayToken) {
      return hayToken;
    } else {
      throw new HttpErrors[400](`token invalido`);
    }
  }




  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  @get('/usuarios/count')
  @response(200, {
    description: 'Usuario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.count(where);
  }

  @authenticate("secretaria", "administrador")
  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuario) filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.usuarioRepository.find(filter);
  }

  @patch('/usuarios')
  @response(200, {
    description: 'Usuario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.updateAll(usuario, where);
  }

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Usuario, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuario>
  ): Promise<Usuario> {
    return this.usuarioRepository.findById(id, filter);
  }

  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.updateById(id, usuario);
  }

  @authenticate("administrador")
  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.replaceById(id, usuario);
  }


  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuario DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.usuarioRepository.deleteById(id);
  }



}
