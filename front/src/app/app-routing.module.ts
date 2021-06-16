import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { combineLatest } from 'rxjs';
import { ClienteColasComponent } from './pages/cliente-colas/cliente-colas.component';
import { ClientePerfilEmpresaComponent } from './pages/cliente-perfil-empresa/cliente-perfil-empresa.component';
import { ClienteRegistroComponent } from './pages/cliente-registro/cliente-registro.component';
import { EmpresaRegistroComponent } from './pages/empresa-registro/empresa-registro.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:"cliente-perfil-empresa", component:ClientePerfilEmpresaComponent},
  {path:"cliente-colas", component:ClienteColasComponent},
  {path:'cliente-registro', component:ClienteRegistroComponent},
  {path:'empresa-registro', component:EmpresaRegistroComponent},
  {path:"**", redirectTo:'login', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
