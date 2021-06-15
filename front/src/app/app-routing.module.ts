import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteColasComponent } from './pages/cliente-colas/cliente-colas.component';
import { ClienteFavoritosComponent } from './pages/cliente-favoritos/cliente-favoritos.component';
import { ClienteHomeComponent } from './pages/cliente-home/cliente-home.component';
import { ClienteOpinionesComponent } from './pages/cliente-opiniones/cliente-opiniones.component';
import { ClientePerfilComponent } from './pages/cliente-perfil/cliente-perfil.component';
import { EmpresaColaComponent } from './pages/empresa-cola/empresa-cola.component';
import { EmpresaHomeComponent } from './pages/empresa-home/empresa-home.component';
import { EmpresaOpinionesPaginaComponent } from './pages/empresa-opiniones-pagina/empresa-opiniones-pagina.component';
import { EmpresaPerfilComponent } from './pages/empresa-perfil/empresa-perfil.component';

const routes: Routes = [
  {path:"clienteHome", component: ClienteHomeComponent },
  {path:"empresaHome", component:EmpresaHomeComponent },
  {path:"clienteColas", component:ClienteColasComponent },
  {path:"empresaCola", component:EmpresaColaComponent },
  {path:"empresaOpiniones", component:EmpresaOpinionesPaginaComponent },
  {path:"clienteOpiniones", component:ClienteOpinionesComponent },
  {path:"clienteFav", component:ClienteFavoritosComponent },
  {path:"empresaPerfil", component:EmpresaPerfilComponent },
  {path:"clientePerfil", component:ClientePerfilComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
