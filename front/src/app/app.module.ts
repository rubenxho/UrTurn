import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { ClienteRegistroComponent } from './pages/cliente-registro/cliente-registro.component';
import { ClienteHomeComponent } from './pages/cliente-home/cliente-home.component';
import { ClienteColasComponent } from './pages/cliente-colas/cliente-colas.component';
import { ClienteOpinionesComponent } from './pages/cliente-opiniones/cliente-opiniones.component';
import { ClientePerfilComponent } from './pages/cliente-perfil/cliente-perfil.component';
import { ClientePerfilEmpresaComponent } from './pages/cliente-perfil-empresa/cliente-perfil-empresa.component';
import { ClienteTarjetasComponent } from './pages/cliente-tarjetas/cliente-tarjetas.component';
import { ClienteFavoritosComponent } from './pages/cliente-favoritos/cliente-favoritos.component';
import { EmpresaRegistroComponent } from './pages/empresa-registro/empresa-registro.component';
import { EmpresaHomeComponent } from './pages/empresa-home/empresa-home.component';
import { EmpresaColaComponent } from './pages/empresa-cola/empresa-cola.component';
import { EmpresaPerfilComponent } from './pages/empresa-perfil/empresa-perfil.component';
import { EmpresaOpinionesComponent } from './pages/empresa-opiniones/empresa-opiniones.component';
import { EmpresaOpinionesPaginaComponent } from './pages/empresa-opiniones-pagina/empresa-opiniones-pagina.component';
import { ClienteBuscadorComponent } from './pages/cliente-buscador/cliente-buscador.component';
import { HeaderEmpresaComponent } from './pages/header-empresa/header-empresa.component';
import { ModalComponent } from './pages/modal/modal.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ModalCambioComponent } from './pages/modal-cambio/modal-cambio.component';
import { HttpClientModule } from '@angular/common/http';
import { NotaComponent } from './pages/nota/nota.component';
import { ClienteBuscaFavoritosComponent } from './pages/cliente-busca-favoritos/cliente-busca-favoritos.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ClienteRegistroComponent,
    ClienteHomeComponent,
    ClienteColasComponent,
    ClienteOpinionesComponent,
    ClientePerfilComponent,
    ClientePerfilEmpresaComponent,
    ClienteTarjetasComponent,
    ClienteFavoritosComponent,
    EmpresaRegistroComponent,
    EmpresaHomeComponent,
    EmpresaColaComponent,
    EmpresaPerfilComponent,
    EmpresaOpinionesComponent,
    EmpresaOpinionesPaginaComponent,
    ClienteBuscadorComponent,
    HeaderEmpresaComponent,
    ModalComponent,
    ModalCambioComponent,
    NotaComponent,
    ClienteBuscaFavoritosComponent,
    // RegistroEmpresaService
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
