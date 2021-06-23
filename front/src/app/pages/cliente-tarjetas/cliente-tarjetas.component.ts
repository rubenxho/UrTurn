import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { LocalServiceService } from 'src/app/services/local-service.service';
import { UsuarioEmpresa } from 'src/app/models/usuario-empresa';

@Component({
  selector: 'app-cliente-tarjetas',
  templateUrl: './cliente-tarjetas.component.html',
  styleUrls: ['./cliente-tarjetas.component.css'],
})
export class ClienteTarjetasComponent implements OnInit {
  @Input() usuarioEmpresa: any;
  //public usuarioEmpresa: UsuarioEmpresa;

  //atributo para hacer favorito
  public favorito: boolean;

  // para modal
  public enCola: boolean;
  public ticket: number;

  constructor(private localService: LocalServiceService) {
    this.usuarioEmpresa = null;
    //this.usuarioEmpresa = new UsuarioEmpresa(
    //  0,
    //  'Sobrino',
    //  'restaurante',
    //  '1231231',
    //  123123,
    //  'espana',
    //  'https://www.elviajerofisgon.com/wp-content/uploads/2016/03/RestaurantesAntiguosEspa%C3%B1a_destacada-1280x720.jpg',
    //  'ok',
    //  1,
    //  2,
    //  3,
    //  'urturn',
    //  []
    //);

    this.ticket = 1150;

    //atributo para hacer favorito
    this.enCola = false;
    this.favorito = false;
  }

  //method para guardar a favorito
  fav() {
    this.favorito = !this.favorito;
  }

  // confirma hace la cola
  comfirmadoCola() {
    this.enCola = true;
  }

  obtenerLocalComponente() {}

  ngOnInit(): void {}
}
