import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-correos',
  templateUrl: './lista-correos.component.html',
  styleUrls: ['./lista-correos.component.scss']
})
export class ListaCorreosComponent implements OnInit {

  correos: any[];
  responder: boolean;

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

    this.correos.push({
      titulo: "Título Email 3",
      cuerpo: `Cuerpo del email, Cuerpo del email,Cuerpo del email,Cuerpo del email,Cuerpo del email,
    Cuerpo del email,Cuerpo del email,Cuerpo del email,Cuerpo del email,Cuerpo del email,Cuerpo del email,
    Cuerpo del email,Cuerpo del email,Cuerpo del email,Cuerpo del email,Cuerpo del email `,
      emisor: 'correoEmisor3@prueba.com',
      receptor: 'correoReceptor@prueba.com',
      leido: false
    });


    this.correos.push({
      titulo: "Título Email 4",
      cuerpo: `Cuerpo del email, Cuerpo del email,Cuerpo del email,Cuerpo del email,Cuerpo del email,
    Cuerpo del email,Cuerpo del email,Cuerpo del email,Cuerpo del email,Cuerpo del email,Cuerpo del email,
    Cuerpo del email,Cuerpo del email,Cuerpo del email,Cuerpo del email,Cuerpo del email `,
      emisor: 'correoEmisor3@prueba.com',
      receptor: 'correoReceptor@prueba.com',
      leido: false
    });
    this.responder = false;
  }

  ngOnInit(): void {
  }

  clickResponder(correo) {
    correo.responder = !correo.responder;
  }

  accionRespuestaRapida(correo) {
    correo.responder=false;
  } 

}
