import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioEmpresa } from 'src/app/models/usuario-empresa';
import { LocalServiceService } from 'src/app/services/local-service.service';
import {Location} from '@angular/common';
import { Opiniones } from 'src/app/models/opiniones';
import { ClienteOpinionesResenarService } from 'src/app/services/cliente-opiniones-resenar.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cliente-perfil-empresa',
  templateUrl: './cliente-perfil-empresa.component.html',
  styleUrls: ['./cliente-perfil-empresa.component.css']
})
export class ClientePerfilEmpresaComponent implements OnInit {
  public opinionParaEmpresaPerfiles:Opiniones[]=[];

 

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
                private router: Router, 
                private toastr: ToastrService,
                private localService: LocalServiceService, 
                private _location: Location,
                private opinionesService: ClienteOpinionesResenarService,
                private lse: LoginService

              ) 
              { 
                this.favorito = false;
                this.frase = "";

                //empresa

                this.local = this.localService.localElegido;
                console.log("this.localService.localElegido>>>>>>>>>>>>>>>>",this.localService.localElegido)

                /*****************/
                this.ColaPosicion = 5;
                this.mensajeModalAvisar = `Estás en la cola, numero ${this.ColaPosicion}`;
                this.clienteCola = ["modalModificar","¿Confirmas hacer la cola?", "Sí", "No", this.mensajeModalAvisar ];
              }

  fav() {
    //console.log(this.favorito);
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

  /**********llamar el service para traer los datos de opiniones*********************/
  getOpiniones(){
    this.local=  this.localService.localElegido
    this.opinionesService.getOpinionesAEmpresa(this.local.id_usuario_empresa).subscribe((data:any):void=>{
      this.opinionParaEmpresaPerfiles=[]
      
      for (let i = 0; i < data.length; i++) {
        this.opinionParaEmpresaPerfiles.push( new Opiniones(
          data[i].id_opiniones,
          data[i].id_usuario_cliente,
          data[i].nombre_cliente,
          data[i].imagen_url,
          this.local.id_usuario_empresa,
          "",
          "",
          data[i].nota,
          data[i].opinion,
          data[i].fecha
      ))
    //console.log("this.opinionParaEmpresaPerfiles>>>>>>>>>>>>>>",this.opinionParaEmpresaPerfiles) // undefined
    //console.log("this.localServive.localElegido>>>>>>>>>>>>>>",this.localService.localElegido)  // direccion: null
    }})
  }

  ngOnInit(): void {
    this.getOpiniones()
   
    //imagen_url: "https://www.buenasnuevas.live/wp-content/uploads/2020/12/Starbucks.jpg"
    //nombre_empresa: "Starbucks"
    //tiempo_espera: 7
    //console.log("this.local.id_usuario_empresa>>>>>>>>>>>>>>", this.local.id_usuario_empresa) // undefined
  }
}
