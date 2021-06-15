import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { combineLatest } from 'rxjs';
import { ClienteColasComponent } from './pages/cliente-colas/cliente-colas.component';
import { ClientePerfilEmpresaComponent } from './pages/cliente-perfil-empresa/cliente-perfil-empresa.component';

const routes: Routes = [

  { path: "cliente-perfil-empresa", component: ClientePerfilEmpresaComponent },
  { path: "cliente-colas", component: ClienteColasComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
