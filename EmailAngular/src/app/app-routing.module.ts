import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorreoComponent } from './components/correo/correo.component';
import { CorreosRecibidosComponent } from './views/correos-recibidos/correos-recibidos.component';
import { EnviarComponent } from './views/enviar/enviar.component';
import { HomeComponent } from './views/home/home.component';
import { VisualizarCorreoComponent } from './views/visualizar-correo/visualizar-correo.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'mails', component: CorreosRecibidosComponent},
  {path: 'send', component: EnviarComponent},
  {path: 'mail', component: VisualizarCorreoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
