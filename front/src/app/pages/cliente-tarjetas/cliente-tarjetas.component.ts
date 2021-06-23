import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { LocalServiceService } from 'src/app/services/local-service.service';

@Component({
  selector: 'app-cliente-tarjetas',
  templateUrl: './cliente-tarjetas.component.html',
  styleUrls: ['./cliente-tarjetas.component.css'],
})
export class ClienteTarjetasComponent implements OnInit {
  @Input() infoLugares: string[];
  @Output() eventoCola = new EventEmitter<string>();

  public foto: string;
  public nombre: string;
  public tiempoAprox: number;
  public infoboton: string;

  //atributo para hacer favorito
  public favorito: boolean;

  // para modal
  public enCola: boolean;
  public ticket: number;

  constructor(private localService: LocalServiceService) {
    // para tarjeta
    this.infoLugares = [];
    this.foto =
      'https://www.elviajerofisgon.com/wp-content/uploads/2016/03/RestaurantesAntiguosEspa%C3%B1a_destacada-1280x720.jpg';
    this.nombre = 'Sobrino de Botín';
    this.tiempoAprox = 20;
    this.infoboton = 'Hacer la cola';
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
