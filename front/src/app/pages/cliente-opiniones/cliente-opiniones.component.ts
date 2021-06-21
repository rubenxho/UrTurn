import { Component, OnInit } from '@angular/core';
import { ClienteOpinionesResenarService } from 'src/app/services/cliente-opiniones-resenar.service';

@Component({
  selector: 'app-cliente-opiniones',
  templateUrl: './cliente-opiniones.component.html',
  styleUrls: ['./cliente-opiniones.component.css'],
})
export class ClienteOpinionesComponent implements OnInit {
  // para mostrar dos campos
  public resenar: boolean;
  public resenado: boolean;

  // para el corazon de favorito
  public favorito: boolean;

  // mesajes para modal

  public quitarTarjeta: boolean;

  // Variable para mostrar todos los locales no reseñados aún
  public notReviews: any[];

  constructor(private reviewService: ClienteOpinionesResenarService) {
    // dos campos
    this.resenar = true;
    this.resenado = false;
    //para el corazon de favorito
    this.favorito = false;
    this.quitarTarjeta = false;

    // Variable para mostrar todos los locales no reseñados aún
    this.notReviews = [];
  }
  fav() {
    this.favorito = !this.favorito;
  }
  dejarOpinar() {
    this.quitarTarjeta = true;
  }
  resenarCampo() {
    this.resenar = true;
    this.resenado = false;
    console.log(this.resenar);
  }
  resenadoCampo() {
    this.resenado = true;
    this.resenar = false;
  }

  ngOnInit(): void {
    this.notReviews = this.reviewService.listarResenasPorCliente('1');
  }
}
