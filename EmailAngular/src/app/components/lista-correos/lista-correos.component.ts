  
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CorreoService } from '../../services/correo.service';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { GmailService } from '../../services/gmail.service';
import { AvisosService } from '../../services/avisos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-correos',
  templateUrl: './lista-correos.component.html',
  styleUrls: ['./lista-correos.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ListaCorreosComponent implements OnInit {

  correos: any[];
  columnsToDisplay: string[] = ['Emisor', 'Asunto', 'Acciones'];
  displayedColumns: string[] = ['emisor', 'titulo', 'id'];
  dataSource = new MatTableDataSource<any>();
  expandedElement: any | null;

  //Suscripciones
  recibidosSubscription: Subscription;
  mensajesSubscription: Subscription[];


  constructor(private gmail: GmailService, private router: Router, private correoService: CorreoService, private servicioAvisos: AvisosService) {
    this.correos = [];
    this.mensajesSubscription = [];
  }

  ngOnInit() {
    this.getRecibidos();
  }


  accionRespuestaRapida(correo) {
    this.expandedElement = null;
  }

  getRecibidos() {
    /**Nos suscribimos al observable */
    this.recibidosSubscription = this.gmail.getRecibidos().subscribe(
      (response) => {
        const mensajes = response['messages'];
        
        mensajes.forEach(element => {
          this.getMensaje(element.id);
        });
      },
      (error) => this.error(error)
    );
  }

  getMensaje(id: string){
    /**Nos suscribimos al observable */
    this.mensajesSubscription.push(this.gmail.getMessage(id).subscribe(
      (correo) => {
        this.dataSource.data.push(correo);
        this.dataSource._updateChangeSubscription();
      },
      (error) => this.error(error)
    ));
  }

  error(error){
    this.servicioAvisos.showMessage("Se ha producido un error");
  }

  verDetalle(correo){
    this.correoService.setCorreo(correo);
    this.router.navigate(['/mail']);
  }

  ngOnDestroy() {
    if(!this.recibidosSubscription.closed) {
      this.recibidosSubscription.unsubscribe();
    }
    this.mensajesSubscription.forEach(element => {
      if(!element.closed)
        element.unsubscribe();
    })
  }
}