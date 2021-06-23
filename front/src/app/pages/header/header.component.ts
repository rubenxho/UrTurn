import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public tipoUsuario:String;
  public posicionMenu:String;
  @Input() public controlador:String;

  constructor(public ls:LoginService) { 
    this.tipoUsuario="";
    this.posicionMenu="home";
    this.controlador="";
  }


  posicion(menu:string){
    this.posicionMenu=menu;
  }


  ngOnInit(): void {
    // alert(this.ls.seleccionarTipoUsuario());
    this.controlador = this.ls.seleccionarTipoUsuario();
  }

}
