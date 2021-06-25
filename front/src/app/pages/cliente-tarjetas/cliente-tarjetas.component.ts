import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { LocalServiceService } from 'src/app/services/local-service.service';
import { UsuarioEmpresa } from 'src/app/models/usuario-empresa';
import { Opiniones } from 'src/app/models/opiniones';

@Component({
  selector: 'app-cliente-tarjetas',
  templateUrl: './cliente-tarjetas.component.html',
  styleUrls: ['./cliente-tarjetas.component.css'],
})
export class ClienteTarjetasComponent implements OnInit {
  @Input() usuarioEmpresa:UsuarioEmpresa;
  
  //public usuarioEmpresa: UsuarioEmpresa;

  //atributo para hacer favorito
  public favorito: boolean;
  // para modal
  public enCola: boolean;
  public ticket: number;
 // public usuarioEmpresas:any

  // para localEmpresa

  public local: UsuarioEmpresa;
  

  /*********************************/

  constructor(private localService: LocalServiceService) {
    this.usuarioEmpresa = new UsuarioEmpresa ();;

    //inicializar local
    this.local = new UsuarioEmpresa ();
    
    //*************************/

    this.ticket = 1150;
  //atributo para hacer favorito
    this.enCola = false;
    this.favorito = false;
  }
  //method para guardar a favorito
  
  fav() {
    this.favorito = !this.favorito;
  }

  // confirma hace la cola
  comfirmadoCola() {
    this.enCola = true;
  }

  // obtenerLocalAll() {
  //   return this.localService.
  //   connectar con LocalServiceService de David
  // }


  //funcion mostrar datos del local según los endpoints
  muestraLocal(){
    
    this.localService.getTop().subscribe((data: any) => {
      this.local= data;
      console.log(this.local)
    })
    
  }
    


  ngOnInit(): void {
    this.muestraLocal()
  }
}
