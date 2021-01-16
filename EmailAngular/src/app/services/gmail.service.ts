import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GmailService {

  constructor(private http: HttpClient, private login: LoginService) { }

  /**Obtenemos un array de identificadores de mensajes pero no los mensajes */
  public getRecibidos = function () {
    const url = "https://www.googleapis.com/gmail/v1/users/"+this.login.infoUser.userId+"/messages?";
    
    const authToken = this.login.infoUser.tokenUser;
    let headers = new HttpHeaders({ Authorization: `Bearer ${authToken}`});
    let params = new HttpParams();
    params.append('maxResults','10');

    return this.http.get(url, { headers: headers, params: params} );
  };

  /**Puede generar un error al obtener un alto número de mensajes, después veremos cómo
   * limitar el número de mensajes que recibimos
   */
  public getMessage = function (id: string) {
    const url = "https://www.googleapis.com/gmail/v1/users/"+this.login.infoUser.userId+"/messages/"+id;
    const authToken = this.login.infoUser.tokenUser;
    let headers = new HttpHeaders({ Authorization: `Bearer ${authToken}`});

    let params = new HttpParams();
    params = params.append('format', 'full');

    let observableRespuesta = this.http.get(url, { headers:headers, params: params } );
    return observableRespuesta.pipe(map(this.helpGetMessage));
  };

  private helpGetMessage = (response: any) => {
    let correo = undefined;
    if(response) {
      const emisor = response ['payload']['headers'].find(e => e.name === 'From');
      const subject = response ['payload']['headers'].find(e => e.name === 'From');

      correo = {
        id: response['id'],
        cuerpo: response['snippet'],
        emisor: emisor ? emisor.value : undefined,
        titulo: subject ? subject.value : undefined
      };
    }
    return correo;
  }

  public sendMessage = function(text: string, to: string, subject: string){
    const url="https://www.googleapis.com/gmail/v1/users/"+this.login.infoUser.userId+"/messages/send";
    const authToken = this.login.infoUser.tokenUser;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    });

    //Plantilla que se ajusta a la documentación que podemos ver del api de Gmail para
    //el envío de emails.
    const emailTemplate = 
      "Content-Type:  text/plain; charset=\"UTF-8\"\nContent-length: 5000\nContent-Transfer-Encoding: message/rfc2822\n" +
      `To: ${to}\n`+
      `Subject: ${subject}\n\n`+
      `${text}`;

    //Codificación concreta que reqiere gmail para visualizarse correctamente
    const base64EncodedEmail = btoa(emailTemplate).replace(/\+/g, '-').replace(/\//g, '_');

    return this.http.post(url, { 'raw': base64EncodedEmail }, { headers: headers })
  }
}