import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente-opiniones',
  templateUrl: './cliente-opiniones.component.html',
  styleUrls: ['./cliente-opiniones.component.css'],
})
export class ClienteOpinionesComponent implements OnInit {
  // atributo para el corazon de favorito
  public favorito: boolean;
  public frase: string;
  // mesajes para modal
  public mensajeModal: string[];
  public mensajeModalEnviar: any[];

  constructor() {
    // atributo para el corazon de favorito
    this.favorito = false;
    this.frase = '';
    // mesajes para modal
    this.mensajeModal = [
      'Dar reseña',
      'Escribe tu opinion',
      'Enviar',
      'Cancelar',
    ];
    this.mensajeModalEnviar = ['Has enviado un opinion'];
  }
  // method para guardar a favorito
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
