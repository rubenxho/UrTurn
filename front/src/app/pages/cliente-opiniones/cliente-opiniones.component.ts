import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente-opiniones',
  templateUrl: './cliente-opiniones.component.html',
  styleUrls: ['./cliente-opiniones.component.css'],
})
export class ClienteOpinionesComponent implements OnInit {
  // atributo para el corazon de favorito
  public favorito: boolean;
  // mesajes para modal
  public mensajeModal: string[];
  public mensajeModalEnviar: any[];
  public resena: boolean;
  public resenaTexto: string[];

  constructor() {
    // atributo para el corazon de favorito
    this.favorito = false;
    this.resena = false;
    // mesajes para modal
    this.mensajeModal = [
      'Dar reseña',
      'Escribe tu opinion',
      'Enviar',
      'Cancelar',
    ];
    this.mensajeModalEnviar = ['Has enviado un opinion'];
    this.resenaTexto = [];
  }
  // method para guardar a favorito
  fav() {
    this.favorito = !this.favorito;
  }
  mostrarResenaBajo(opinionCliente: string) {
    this.resena = true;
    this.resenaTexto.push(opinionCliente);
  }

  ngOnInit(): void {}
}
