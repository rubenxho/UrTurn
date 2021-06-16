import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente-opiniones',
  templateUrl: './cliente-opiniones.component.html',
  styleUrls: ['./cliente-opiniones.component.css'],
})
export class ClienteOpinionesComponent implements OnInit {
  public favorito: boolean;
  public frase: string;
  constructor() {
    this.favorito = false;
    this.frase = '';
  }
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
