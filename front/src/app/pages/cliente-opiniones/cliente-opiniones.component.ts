import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Opiniones } from 'src/app/models/opiniones';
import { ClienteOpinionesResenarService } from 'src/app/services/cliente-opiniones-resenar.service';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioCliente} from 'src/app/models/usuario-cliente'
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
  public opiniones: any;
  // para mostrar dos campos
  public comentar: boolean;
  public comentarios: boolean;
  // para campo de comentar
  public comentarAzul: boolean;
  // para el corazon de favorito
  public favorito: boolean;
  // mesajes para modal
  public quitarTarjeta: boolean;
  // estrellas valor
  public estrellas:number;

  // 
  public lscInfoPintar:any
  constructor(private opinionesService: ClienteOpinionesResenarService, private lsc: LoginService, private lscInfo: UsuarioServiceService) {
    this.locales = "";
    this.opiniones = "";
    // dos campos
    this.comentar = true;
    this.comentarios = false;
    // campo de comentar
    this.comentarAzul = true;
    //para el corazon de favorito
    this.favorito = false;
    this.quitarTarjeta = false;
    // valor estrella defecto
    this.estrellas=0
    //
    this.lscInfoPintar=""
  }
  // guardar a favorito
  fav() {
    this.favorito = !this.favorito;
  }
  // abandonar a comentar
  dejarOpinar() {
    this.quitarTarjeta = true;
  }
  //funcion de boton de comentar
  comentarCampo() {
    this.comentar = true;
    this.comentarios = false;
    this.comentarAzul = true;
  }
  //funcion de boton de comentarios
  comentariosCampo() {
    this.comentarios = true;
    this.comentar = false;
    this.comentarAzul = false;
  }

  //Agarrar estrellas
  handleStar(event:any){
  // const index:string = event.target.name
    const value:string = event.target.value
    this.estrellas = parseInt(value)
    console.log(this.estrellas)
    return this.estrellas
  }
  /******************************************* CAMPO 1 comentar **************************************************/ 
  // mostrar las colas que ha terminado de este cliente
  empresaVistadas(){
    this.lsc.login.id_usuario_cliente=11 // al final se quita
    this.opinionesService.getEmpresaVisitadasDeCliente(this.lsc.login.id_usuario_cliente).subscribe((date:any)=>{
      console.log(date[0])
      console.log(this.locales)
      return  this.locales = date
    })
  }

  // crear un comentario nuevo
  crearComentario(textoOpinion:string){
    let nota = this.estrellas

    this.lscInfo.obtenerUserClienteId(this.lsc.login.id_usuario_cliente).subscribe((date:any)=>{
      this.lscInfoPintar = date
    console.log(this.lscInfoPintar)
    })

    let opinionNuevo = new Opiniones(0,this.lsc.login.id_usuario_cliente,"this.lscInfoPintar. ","clienteImagen",29,"empresaNombre","empresaImagen",nota,textoOpinion); // falta id de usuario empresa que el cliente ha terminado turno.
    this.opinionesService.postOpinion(opinionNuevo).subscribe((date:any)=>{
    })
    this.quitarTarjeta = true;
  }


  /******************************************* CAMPO 2 comentarios **************************************************/ 
  // coger todos comentarios hechos de este cliente, mostrar la info de la empresa.
  opinionesClienteSobreEmpresa() {
    let id = this.lsc.login.id_usuario_cliente;
    this.opinionesService.getEmpresaOpiniones(id).subscribe((date: any) => {
      console.log(date)
      return this.opiniones = date;
    });
  }

  ngOnInit(): void {}
}
