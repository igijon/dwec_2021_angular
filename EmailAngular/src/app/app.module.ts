import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { NuevoCorreoComponent } from './components/nuevo-correo/nuevo-correo.component';
//mport { AvisosComponent } from './components/avisos/avisos.component';
import { CorreosRecibidosComponent } from './views/correos-recibidos/correos-recibidos.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
//Material libs
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';

import {
  GoogleApiModule,
  NgGapiClientConfig,
  NG_GAPI_CONFIG
} from "ng-gapi";
import { MenuComponent } from './menu/menu.component';
import { EnviarComponent } from './views/enviar/enviar.component';
import { HomeComponent } from './views/home/home.component';
import { VisualizarCorreoComponent } from './views/visualizar-correo/visualizar-correo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CorreoComponent } from './components/correo/correo.component';
import { ListaCorreosComponent } from './components/lista-correos/lista-correos.component';
import { AppRoutingModule } from './app-routing.module';
import { MatTableModule } from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
    //AvisosComponent,
    CorreosRecibidosComponent,
    LoginComponent,
    MenuComponent,
    EnviarComponent,
    HomeComponent,
    VisualizarCorreoComponent
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
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatToolbarModule,
    MatTableModule,
    MatInputModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
