import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente-perfil-empresa',
  templateUrl: './cliente-perfil-empresa.component.html',
  styleUrls: ['./cliente-perfil-empresa.component.css']
})
export class ClientePerfilEmpresaComponent implements OnInit {

  public favorito: boolean;
  public frase: string;

  constructor() { 

    this.favorito = false;
    this.frase = "";

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

  ngOnInit(): void {
  }

}
