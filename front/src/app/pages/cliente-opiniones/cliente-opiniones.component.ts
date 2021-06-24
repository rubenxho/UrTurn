import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Opiniones } from 'src/app/models/opiniones';
import { ClienteOpinionesResenarService } from 'src/app/services/cliente-opiniones-resenar.service';
import { UsuarioEmpresa } from 'src/app/models/usuario-empresa';

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
      ),
      new UsuarioEmpresa(
        0,
        'S2',
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
      ),
      new UsuarioEmpresa(
        0,
        'S3',
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
      ),
      new UsuarioEmpresa(
        0,
        'S4',
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
      ),
    ];

    this.opiniones = [
      new Opiniones(1, 1, '', '', 1,'','', 5, 'genial'),
      new Opiniones(1, 2, '', '', 1,'','', 5, 'genial'),
      new Opiniones(1, 3, '', '', 1,'','', 5, 'genial'),
    ];
    // dos campos
    this.comentar = true;
    this.comentarios = false;
    // campo de comentar
    this.comentarAzul = true;
    //para el corazon de favorito
    this.favorito = false;
    this.quitarTarjeta = false;
  }
  fav() {
    this.favorito = !this.favorito;
  }
  dejarOpinar() {
    this.quitarTarjeta = true;
  }
  comentarCampo() {
    this.comentar = true;
    this.comentarios = false;
    this.comentarAzul = true;
  }
  comentariosCampo() {
    this.comentarios = true;
    this.comentar = false;
    this.comentarAzul = false;
  }
  opinionesCliente() {
    this.opinionesService.getOpiniones().subscribe((date: any) => {
      this.opiniones = date; // opiniones debe definir separatamente
    });
  }

  ngOnInit(): void {}
}
