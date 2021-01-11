import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CorreoService {

  correo: any;

  constructor() { }

  setCorreo(correo: any)
  {
    this.correo = correo;
  }

}
