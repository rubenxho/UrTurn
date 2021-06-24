import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioEmpresa } from 'src/app/models/usuario-empresa';
import { LocalServiceService } from 'src/app/services/local-service.service';
import {Location} from '@angular/common';

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

  //empresa

  public local: UsuarioEmpresa;

  /**********************************/

  constructor(
                private router: Router, private toastr: ToastrService,
                private localServive: LocalServiceService, private _location: Location
              ) 
              { 

                this.favorito = false;
                this.frase = "";

                //empresa

                this.local = this.localServive.localElegido;

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

  //metodo para volver a pagina anterior
  backClicked() {
    this._location.back();
  }
  /*******************************/

  showSucces(){
    this.toastr.success(this.frase);
  }

  ngOnInit(): void {
  }

}
