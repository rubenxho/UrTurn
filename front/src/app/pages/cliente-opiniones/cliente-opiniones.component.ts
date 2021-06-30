import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Opiniones } from 'src/app/models/opiniones';
import { ClienteOpinionesResenarService } from 'src/app/services/cliente-opiniones-resenar.service';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioCliente } from 'src/app/models/usuario-cliente';
import { UsuarioEmpresa } from 'src/app/models/usuario-empresa';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';

@Component({
  selector: 'app-cliente-opiniones',
  templateUrl: './cliente-opiniones.component.html',
  styleUrls: ['./cliente-opiniones.component.css'],
})
export class ClienteOpinionesComponent implements OnInit {
  @Input() usuarioEmpresa: any;

  public locales: any;
  public opiniones: Opiniones[];

  // para mostrar dos campos
  public comentar: boolean;
  public comentarios: boolean;

  // para campo de comentar
  public comentarAzul: boolean;
  // estrellas valor
  public estrellas: number;

  // la empresa que estamos comentando
  private empresaComentando: any;
  // la empresa que estamos quitando, sin comentar
  private empresaSinComentar: any;

  public lscInfoPintar: any;
  constructor(
    private opinionesService: ClienteOpinionesResenarService,
    private lsc: LoginService,
    private lscInfo: UsuarioServiceService
  ) {

    this.locales = '';
    this.opiniones = [];
    // dos campos
    this.comentar = true;
    this.comentarios = false;
    // campo de comentar
    this.comentarAzul = true;
    // valor estrella defecto
    this.estrellas = 0;
    this.lscInfoPintar = '';
  }

  // abandonar a comentar
  dejarOpinar(local: any) {
    this.empresaSinComentar = local;
  }
  comentarLocal(local: any) {
    this.empresaComentando = local;
  }

  //funcion de boton de comentarios
  comentariosCampo() {
    this.comentarios = true;
    this.comentar = false;
    this.comentarAzul = false;
  }
  //Agarrar estrellas
  handleStar(event: any) {
    // const index:string = event.target.name
    const value: string = event.target.value;
    this.estrellas = parseInt(value);
    //console.log(this.estrellas);
    return this.estrellas;
  }

  /******************************************* CAMPO 1 comentar **************************************************/
  //funcion de boton de comentar
  comentarCampo() {
    this.comentar = true;
    this.comentarios = false;
    this.comentarAzul = true;
    // Para actualizar otra vez
    this.actualizarDatos();
  }

  actualizarDatos(){
    // actual 
    this.opinionesService
      .getEmpresaVisitadasDeCliente(this.lsc.login.id_usuario_cliente)
      .subscribe((date: any) => {
        return (this.locales = date);
      });
  }

  // crear un comentario nuevo
  crearComentario(textoOpinion: string) {
    let nota = this.estrellas;
    let opinionNuevo = Opiniones.create(
      this.lsc.login.id_usuario_cliente,
      this.empresaComentando.id_usuario_empresa,
      nota,
      textoOpinion
    ); 
    this.opinionesService.postOpinion(opinionNuevo).subscribe((data: any) => {
      this.locales = this.locales.filter((local: any) => {
        return (
          local.id_usuario_empresa != this.empresaComentando.id_usuario_empresa
        );
      });
    });
  }

  // Cuando envie un comentario, se borra esta tarjeta. el endpoint es "post"
  rechazarOpinion() {
    this.opinionesService
      .postOpinionRechaza(
        this.lsc.login.id_usuario_cliente,
        this.empresaSinComentar.id_usuario_empresa
      )
      .subscribe((data) => {
        this.locales = this.locales.filter((local: any) => {
          return (
            local.id_usuario_empresa !=
            this.empresaSinComentar.id_usuario_empresa
          );
        });
      });
  }

  /******************************************* CAMPO 2 comentarios **************************************************/
    opinionesClienteSobreEmpresa(){
    this.opinionesService.getOpinionesACliente(this.lsc.login.id_usuario_cliente).subscribe((data:any):void=>{
      this.opiniones=[];
      for (let i = 0; i < data.length; i++) {
        this.opiniones.push( new Opiniones(
          data[i].id_opiniones,
          this.lsc.login.id_usuario_cliente,
          "",
          "",
          data[i].id_usuario_empresa,
          data[i].nombre_empresa,
          data[i].imagen_url,
          data[i].nota,
          data[i].opinion,
          data[i].fecha
         
      ))
    }})
  }

  ngOnInit(): void {
    /******************************************* CAMPO 1 comentar **************************************************/
    // Por defecto mostrar los turnos que ha terminado.
     this.actualizarDatos();
  }
}
