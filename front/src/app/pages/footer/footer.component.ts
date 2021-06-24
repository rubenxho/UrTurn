import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public posicionMenu:string=""
  public empresa:boolean
  @Input() public controlador:String;

  constructor(private ls:LoginService) {
    this.posicionMenu="home"
    this.empresa=true
    this.controlador="";
  }

  posicion(posicion:string){
    this.posicionMenu=posicion;
  }
 

  ngOnInit(): void {
    this.controlador = this.ls.seleccionarTipoUsuario();
  }

}
