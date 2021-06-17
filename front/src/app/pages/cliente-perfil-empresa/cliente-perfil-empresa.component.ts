import { ThisReceiver } from '@angular/compiler';
import { TransformVisitor } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-cliente-perfil-empresa',
  templateUrl: './cliente-perfil-empresa.component.html',
  styleUrls: ['./cliente-perfil-empresa.component.css']
})
export class ClientePerfilEmpresaComponent implements OnInit {

  //favoritos

  public favorito: boolean;
  public frase: string;

  //modal y toast de hacer cola

  public clienteCola: string [];
  public mensajeModalAvisar: any;
  public ColaPosicion: number;

  constructor(private router: Router, private toastr: ToastrService) { 

    this.favorito = false;
    this.frase = "";

    /*****************/
    this.ColaPosicion = 5;
    this.mensajeModalAvisar = `Estás en la cola, numero ${this.ColaPosicion}`;
    this.clienteCola = ["modalModificar","¿Confirmas hacer la cola?", "Sí", "No", this.mensajeModalAvisar ];
  }

  fav() {
    console.log(this.favorito);
    this.favorito = !this.favorito;
    if (this.frase === 'Has guardado este lugar a favorito!') {
      this.frase = 'Has cancelado el favorito';
      this.showSucces();
    } else {
      this.frase = 'Has guardado este lugar a favorito!';
      this.showSucces();
    }
  }

  goBack() {
    this.router.navigate(['/app-cliente-tarjetas'])
  }

  showSucces(){
    this.toastr.success(this.frase);
  }

  ngOnInit(): void {
  }

}
