import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public tipoUsuario:String;
  public posicionMenu:String;
  @Input() public controlador:String;

  constructor() { 
    this.tipoUsuario="Empresa";
    this.posicionMenu="home";
    this.controlador="";
  }


  posicion(menu:string){
    this.posicionMenu=menu;
  }


  ngOnInit(): void {
  }

}
