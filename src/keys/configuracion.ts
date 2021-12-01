//informacion de configuracion
export namespace Configuracion {

  //url
  export const urlCorreo = "http://localhost:5000/correo";
  export const urlSms = "http://localhost:5000/sms";
  export const urlCrearToken = "http://localhost:5001/crear-token";
  export const urlValidarToken = "http://localhost:5001/validar-token";
  export const urlValidarSession = "http://localhost:5001/validar-session"

  //hash
  export const hashNotificacion = "123"
  export const respuesta = "el mensaje fue enviado correctamente"

  //usuario
  export const mensajeUsuarioCreado = "Bienvenido! su registro en la plataforma ha sido exitoso"
  export const mensajeUsuarioCreadoClave = "su clave es: "
  export const asuntoUsuarioCreado = "Bienvenido a la plataforma trabajos academicos"

  //cambiarClave
  export const mensajeCambioClave = "Su contraseña ha sido actualizada correctamente, si no fue usted cambiela :v"
  export const asuntoClave = "Cambio de contraseña"
  export const mensajeRecuperarClave = "Su nueva contraseña es: "

  //body
  export const saludo = "Hola";
  export const destinoArg = "destino";
  export const asuntoArg = "asunto";
  export const mensajeArg = "mensaje";
  export const hashArg = "hash";
  export const nombreArg = "nombre";
  export const idUserArg = "id_usuario";
  export const idRolArg = "id_rol"
  export const tokenArg = "token"
  export const rolArg = "rol"


  //roles
  export const rolAdministrador = 2;
  export const rolSecretaria = 3;

}
