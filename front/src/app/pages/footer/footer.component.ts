import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public posicionMenu:string=""
public empresa:boolean

  constructor() {
    this.posicionMenu="home"
    this.empresa=false
  }

  posicion(posicion:string){
    this.posicionMenu=posicion
   
  }
 

  ngOnInit(): void {
  }

}
