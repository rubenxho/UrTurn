import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public posicionMenu:string=""
  public empresa:boolean
  @Input() public controlador:String;

  constructor() {
    this.posicionMenu="home"
    this.empresa=false
    this.controlador="";
  }

  posicion(posicion:string){
    this.posicionMenu=posicion
   
  }
 

  ngOnInit(): void {
  }

}
