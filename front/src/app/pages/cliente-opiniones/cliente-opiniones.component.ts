import { Component, OnInit } from '@angular/core';
import { ClienteOpinionesResenarService } from 'src/app/services/cliente-opiniones-resenar.service';

@Component({
  selector: 'app-cliente-opiniones',
  templateUrl: './cliente-opiniones.component.html',
  styleUrls: ['./cliente-opiniones.component.css'],
})
export class ClienteOpinionesComponent implements OnInit {
  // para mostrar dos campos
  public comentar: boolean;
  public comentarios: boolean;

  // para campo de comentar
  public comentarAzul: boolean;

  // para el corazon de favorito
  public favorito: boolean;

  // mesajes para modal
  public quitarTarjeta: boolean;

  // Variable para mostrar todos los locales no reseñados aún
  public notReviews: any[];

  constructor(private reviewService: ClienteOpinionesResenarService) {
    // dos campos
    this.comentar = true;
    this.comentarios = false;
    // campo de comentar
    this.comentarAzul = true;
    //para el corazon de favorito
    this.favorito = false;
    //
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

  ngOnInit(): void {
    this.notReviews = this.reviewService.listarResenasPorCliente('1');
  }
}
