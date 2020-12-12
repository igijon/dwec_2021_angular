import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-correos',
  templateUrl: './lista-correos.component.html',
  styleUrls: ['./lista-correos.component.scss']
})
export class ListaCorreosComponent implements OnInit {

  correos: any;

  constructor() { 
    const correo1 = {
      titulo: "Título Email 1",
      cuerpo: `Cuerpo del email, Cuerpo del email,Cuerpo del email,Cuerpo del email,Cuerpo del email,
      Cuerpo del email,Cuerpo del email,Cuerpo del email,Cuerpo del email,Cuerpo del email,Cuerpo del email,
      Cuerpo del email,Cuerpo del email,Cuerpo del email,Cuerpo del email,Cuerpo del email `,
      emisor: 'correoEmisor@prueba.com',
      receptor: 'correoReceptor@prueba.com',
      leido: true
    };
    const correo2 = {
      titulo: "Título Email 2",
      cuerpo: `Cuerpo del email, Cuerpo del email,Cuerpo del email,Cuerpo del email,Cuerpo del email,
      Cuerpo del email,Cuerpo del email,Cuerpo del email,Cuerpo del email,Cuerpo del email,Cuerpo del email,
      Cuerpo del email,Cuerpo del email,Cuerpo del email,Cuerpo del email,Cuerpo del email `,
      emisor: 'correoEmisor@prueba.com',
      receptor: 'correoReceptor@prueba.com',
      leido: false
    };

    this.correos = [];
    this.correos.push(correo1);
    this.correos.push(correo2);
  }

  ngOnInit(): void {
  }

}
