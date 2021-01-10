import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

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
    return this.http.get(url, { headers } );
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

    return this.http.get(url, { headers:headers, params: params } );
  };

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