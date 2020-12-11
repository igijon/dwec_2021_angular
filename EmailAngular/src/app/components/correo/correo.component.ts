import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.component.html',
  styleUrls: ['./correo.component.scss']
})
export class CorreoComponent implements OnInit {

  correo: any;

  constructor() {
    this.correo = {
      titulo: "Título Email",
      cuerpo: `Cuerpo del email, Cuerpo del email,Cuerpo del email,Cuerpo del email,Cuerpo del email,
      Cuerpo del email,Cuerpo del email,Cuerpo del email,Cuerpo del email,Cuerpo del email,Cuerpo del email,
      Cuerpo del email,Cuerpo del email,Cuerpo del email,Cuerpo del email,Cuerpo del email `,
      emisor: 'correoEmisor@prueba.com',
      destinatario: 'correoReceptor@prueba.com'
    }
   }

  ngOnInit(): void {
  }

}
