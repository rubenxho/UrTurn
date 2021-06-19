import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cliente-tarjetas',
  templateUrl: './cliente-tarjetas.component.html',
  styleUrls: ['./cliente-tarjetas.component.css'],
})
export class ClienteTarjetasComponent implements OnInit {
  // Info de trajeta:  1.foto,  2.nombre,  3.tiempoAprox,  4.boton
  public foto: string[];
  public nombre: string[];
  public tiempoAprox: number[];
  public boton: string;

  //atributo para hacer favorito
  public favorito: boolean;

  // llamar modal
  public mensajeModal: string[];
  public mensajeModalAvisar: any;
  public ColaPosicion: number[];
  public enCola: boolean;

  constructor() {
    // Info de trajeta: 1.foto,2.nombre,3.tiempoAprox,4.boton
    this.foto = [
      'https://www.elviajerofisgon.com/wp-content/uploads/2016/03/RestaurantesAntiguosEspa%C3%B1a_destacada-1280x720.jpg',
      'https://img.freepik.com/vector-gratis/fondo-blanco-minimo_1393-309.jpg?size=626&ext=jpg',
      'https://estaticos-cdn.prensaiberica.es/clip/e7aca637-102b-4202-ad24-5ce54f34e1c2_16-9-aspect-ratio_default_0.jpg',
      'https://i0.wp.com/www.rutasporespana.es/blog/wp-content/uploads/2017/06/Hammam6.jpg?resize=675%2C450&ssl=1',
    ];
    this.nombre = ['Sobrino de Botín', 'Holliday GYM', 'Hamman'];
    this.tiempoAprox = [20, 15, 20];
    this.boton = 'Hacer la cola';
    this.ColaPosicion = [5, 8, 10];
    this.enCola = false;

    //atributo para hacer favorito
    this.favorito = false;

    // la info de modal
    this.mensajeModal = ['colaModal', '¿Confirmas hacer la cola?', 'Sí', 'No'];
  }
  //method para guardar a favorito
  fav() {
    this.favorito = !this.favorito;
  }

  comfirmadoCola() {
    this.enCola = true;
  }

  ngOnInit(): void {}
}
