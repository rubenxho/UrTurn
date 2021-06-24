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
  @Input() usuarioEmpresa: any;
  //public usuarioEmpresa: UsuarioEmpresa;

  //atributo para hacer favorito
  public favorito: boolean;
  // para modal
  public enCola: boolean;
  public ticket: number;
  public usuarioEmpresas:any

  constructor(private localService: LocalServiceService) {
    this.usuarioEmpresas = [
      new UsuarioEmpresa(1,"GYM","DEPORTE","123456",28026,"Espana","fotoE","Mejor GYM","09:00","18:00",20,"GYM",[new Opiniones(1,1,"eva","fotoC",1,"GYM","fotoE",5,"MUY BIEN"),new Opiniones(1,1,"eva","fotoC",1,"GYM","fotoE",5,"MUY BIEN")],"123@.com","2021-06-24")

    ];
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

  obtenerLocalAll() {
    // return this.localService.
    // connectar con LocalServiceService de David
  }


  ngOnInit(): void {}
}
