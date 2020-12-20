import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CorreoComponent } from './components/correo/correo.component';
import { ListaCorreosComponent } from './components/lista-correos/lista-correos.component';
import { NuevoCorreoComponent } from './components/nuevo-correo/nuevo-correo.component';
import { AvisosComponent } from './components/avisos/avisos.component';
import { CorreosRecibidosComponent } from './views/correos-recibidos/correos-recibidos.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import {
  GoogleApiModule,
  NgGapiClientConfig,
  NG_GAPI_CONFIG
} from "ng-gapi";

let gapiClientConfig: NgGapiClientConfig = {
  client_id: "134377892924-a3vvhui20kl0bkefcknh7pe9ab7i5gr7.apps.googleusercontent.com",
  discoveryDocs: ["https://analyticsreporting.googleapis.com/$discovery/rest?version=v4"],
  ux_mode: "popup",
  redirect_uri: "http://localhost:4200/loged",
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/gmail.labels",
    "https://www.googleapis.com/auth/gmail.send",
    "https://www.googleapis.com/auth/gmail.readonly"
  ].join(" ")
};

@NgModule({
  declarations: [
    AppComponent,
    CorreoComponent,
    ListaCorreosComponent,
    NuevoCorreoComponent,
    AvisosComponent,
    CorreosRecibidosComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
