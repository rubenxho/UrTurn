import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public tipoUsuario:String;
  public posicionMenu:String;

  constructor() { 
    this.tipoUsuario="Empresa";
    this.posicionMenu=""
  }

  posicion(menu:string){
    this.posicionMenu=menu;
  }


  ngOnInit(): void {
  }

}
