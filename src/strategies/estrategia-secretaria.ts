import {AuthenticationStrategy} from '@loopback/authentication';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {Configuracion} from '../keys/configuracion';
const fetch = require('node-fetch');


export class EstrategiaSecretaria implements AuthenticationStrategy {
  name: string = 'secretaria';

  constructor(

  ) { }

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    let tk = parseBearerToken(request);
    console.log('parseBearer' + tk);
    if (tk) {
      //validarlo
      console.log('es valido?' + tk);
      let rolSecretaria = Configuracion.rolSecretaria;
      let urlToken = `${Configuracion.urlValidarToken}?${Configuracion.tokenArg}=${tk}&${Configuracion.rolArg}=${rolSecretaria}`
      console.log(urlToken);
      let respuesta = "";
      await fetch(urlToken)
        .then(async (res: any) => {
          let respuestaa = await res.text();
          console.log(respuesta);
          //console.log('respuesta del fetch' + respuesta);
          respuesta = respuestaa;
        })
      //console.log("respuesta antes del switch" + respuesta);
      switch (respuesta) {
        case "OK":
          let perfil: UserProfile = Object.assign({
            secretaria: "OK"
          });
          return perfil;
          break;
        case "KO":
          throw new HttpErrors[401]("el rol del token no es valido");
          break;
        case "":
          throw new HttpErrors[401]("el token no es valido")
          break;
      }
    } else {
      throw new HttpErrors[401]("la rquest no tiene un token")
    }
  }

}
