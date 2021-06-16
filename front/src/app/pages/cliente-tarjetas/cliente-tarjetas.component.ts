import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cliente-tarjetas',
  templateUrl: './cliente-tarjetas.component.html',
  styleUrls: ['./cliente-tarjetas.component.css'],
})
export class ClienteTarjetasComponent implements OnInit {
  // Info de trajeta:  1.foto,  2.nombre,  3.tiempoAprox,  4.boton
  public foto: string;
  public nombreLugar: string;
  public tiempoAprox: number;
  public boton: string;

  //atributo para hacer favorito
  public favorito: boolean;
  public frase: string;

  // llamar modal
  public mensajeModal: string[];
  public mensajeModalAvisar: any;
  public ColaPosicion: number;

  constructor() {
    // Info de trajeta: 1.foto,2.nombre,3.tiempoAprox,4.boton
    this.foto =
      'https://www.elviajerofisgon.com/wp-content/uploads/2016/03/RestaurantesAntiguosEspa%C3%B1a_destacada-1280x720.jpg';
    this.nombreLugar = 'Sobrino de Botín';
    this.tiempoAprox = 20;
    this.boton = 'Hacer la cola';

    //atributo para hacer favorito
    this.favorito = false;
    this.frase = '';

    // la info de modal
    this.mensajeModal = ['colaModal', '¿Confirmas hacer la cola?', 'Sí', 'No'];
    this.ColaPosicion = 5;
    this.mensajeModalAvisar = `Estás en la cola, numero ${this.ColaPosicion}`;
  }

  //method para guardar a favorito
  fav() {
    console.log(this.favorito);
    this.favorito = !this.favorito;
    if (this.frase === 'Has guardado este lugar a favorito!') {
      this.frase = 'Has cancelado el favorito';
    } else {
      this.frase = 'Has guardado este lugar a favorito!';
    }
  }

  ngOnInit(): void {}
}
