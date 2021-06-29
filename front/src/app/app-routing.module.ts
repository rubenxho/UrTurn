import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientePerfilEmpresaComponent } from './pages/cliente-perfil-empresa/cliente-perfil-empresa.component';
import { ClienteColasComponent } from './pages/cliente-colas/cliente-colas.component';
import { ClienteFavoritosComponent } from './pages/cliente-favoritos/cliente-favoritos.component';
import { ClienteHomeComponent } from './pages/cliente-home/cliente-home.component';
import { ClienteOpinionesComponent } from './pages/cliente-opiniones/cliente-opiniones.component';
import { ClientePerfilComponent } from './pages/cliente-perfil/cliente-perfil.component';
import { EmpresaColaComponent } from './pages/empresa-cola/empresa-cola.component';
import { EmpresaHomeComponent } from './pages/empresa-home/empresa-home.component';
import { EmpresaOpinionesPaginaComponent } from './pages/empresa-opiniones-pagina/empresa-opiniones-pagina.component';
import { EmpresaPerfilComponent } from './pages/empresa-perfil/empresa-perfil.component';
import { ClienteRegistroComponent } from './pages/cliente-registro/cliente-registro.component';
import { EmpresaRegistroComponent } from './pages/empresa-registro/empresa-registro.component';
import { LoginComponent } from './pages/login/login.component';
import { ClienteTarjetasComponent } from './pages/cliente-tarjetas/cliente-tarjetas.component';
import { LoginService } from './services/login.service';
import { ClienteBuscaFavoritosComponent } from './pages/cliente-busca-favoritos/cliente-busca-favoritos.component';

const routes: Routes = [
  { path: 'cliente-perfil-empresa', component: ClientePerfilEmpresaComponent },
  // {path: "cliente-colas", component: ClienteColasComponent },
  { path: 'clienteHome', component: ClienteHomeComponent},
  { path: 'empresaHome', component: EmpresaHomeComponent },
  { path: 'clienteColas', component: ClienteColasComponent },
  { path: 'empresaCola', component: EmpresaColaComponent },
  { path: 'empresaOpiniones', component: EmpresaOpinionesPaginaComponent },
  { path: 'clienteOpiniones', component: ClienteOpinionesComponent },
  { path: 'clienteFav', component: ClienteFavoritosComponent },
  { path: 'empresaPerfil', component: EmpresaPerfilComponent },
  { path: 'clientePerfil', component: ClientePerfilComponent },
  { path: 'login', component: LoginComponent, canActivate:[LoginService] },
  { path: 'cliente-perfil-empresa', component: ClientePerfilEmpresaComponent },
  { path: 'cliente-colas', component: ClienteColasComponent },
  { path: 'cliente-registro', component: ClienteRegistroComponent, canActivate:[LoginService] },
  { path: 'empresa-registro', component: EmpresaRegistroComponent, canActivate:[LoginService] },
  { path: 'clienteTarjetas', component: ClienteTarjetasComponent },
  // { path: '', component: LoginComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
  { path: 'buscaFav', component: ClienteBuscaFavoritosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
