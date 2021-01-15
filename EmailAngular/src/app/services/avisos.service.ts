import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AvisosService {

  constructor(private _snackBar: MatSnackBar) {}

  showMessage(mensaje: string, tipo?:string){
    let tipoMensaje = 'Información';
    if (tipo)
      tipoMensaje = tipo;
    this._snackBar.open(mensaje, 'Información', {
      duration: 2000,
    });
  }
}