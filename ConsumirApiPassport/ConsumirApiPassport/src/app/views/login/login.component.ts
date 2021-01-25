import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  nuevoLogin: FormGroup;
  submitted = false;
  message: string;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) { 
    this.nuevoLogin = this.formBuilder.group({
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.message = "";
  }

  ngOnInit(): void {
    //Si ya hemos hecho login vamos a /articles
    if(this.loginService.isUserSignedIn())
    {
      this.router.navigate(['/artiles']);
    }
  }

  get formulario() { return this.nuevoLogin.controls; }

  onSubmit() {
    this.submitted = true;
    if(this.nuevoLogin.invalid) {
      return;
    }

    let datosUsuario = this.nuevoLogin.value;
    const usuario = datosUsuario.usuario;
    const password = datosUsuario.password;

    this.onReset();
    //Nos subscribimos a la petición de login que se implementa en el servicio
    this.loginService.loginSuscription(usuario, password);
    this.message = this.loginService.message;
  }

 

  onReset() {
    this.submitted = false;
    this.nuevoLogin.reset();
  }

  cancel() {
    this.onReset();
  }
}
