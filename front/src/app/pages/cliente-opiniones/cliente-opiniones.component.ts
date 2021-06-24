import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Opiniones } from 'src/app/models/opiniones';
import { ClienteOpinionesResenarService } from 'src/app/services/cliente-opiniones-resenar.service';
import { UsuarioEmpresa } from 'src/app/models/usuario-empresa';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cliente-opiniones',
  templateUrl: './cliente-opiniones.component.html',
  styleUrls: ['./cliente-opiniones.component.css'],
})
export class ClienteOpinionesComponent implements OnInit {
  @Input() usuarioEmpresa: any;

  public locales: UsuarioEmpresa[];
  public opiniones: Opiniones[];
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

  constructor(private opinionesService: ClienteOpinionesResenarService) {
    
    this.locales = [
      new UsuarioEmpresa(
        0,
        'S1',
        'restaurante',
        '1231231',
        123123,
        'espana',
        'https://www.elviajerofisgon.com/wp-content/uploads/2016/03/RestaurantesAntiguosEspa%C3%B1a_destacada-1280x720.jpg',
        'ok',
        1,
        2,
        3,
        'urturn',
        []
      ),new UsuarioEmpresa(
        0,
        'S1',
        'restaurante',
        '1231231',
        123123,
        'espana',
        'https://www.elviajerofisgon.com/wp-content/uploads/2016/03/RestaurantesAntiguosEspa%C3%B1a_destacada-1280x720.jpg',
        'ok',
        1,
        2,
        3,
        'urturn',
        []
      )
    ];
    this.opiniones = [];

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

  // crear un comentario
  crearComentario(textoOpinion:string){
    let nota = this.estrellas
    let opinionNuevo = new Opiniones(0,1,"clienteNombre","clienteImagen",29,"empresaNombre","empresaImagen",nota,textoOpinion);
    this.opinionesService.postOpinion(opinionNuevo).subscribe((date:any)=>{
    })
    this.quitarTarjeta = true;

  }
  // coger todos comentarios de este cliente
  opinionesCliente() {
    this.opinionesService.getOpiniones().subscribe((date: any) => {
    this.opiniones = date;
    });
  }

  ngOnInit(): void {}
}
