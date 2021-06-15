import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empresa-home',
  templateUrl: './empresa-home.component.html',
  styleUrls: ['./empresa-home.component.css']
})
export class EmpresaHomeComponent implements OnInit {

  public cola:boolean;

  constructor() {

    this.cola=true;
   }

  estadoCola(op:string){
    
    console.log("Prueba")
    if(op=="uno"){
      this.cola=true;
    }
    else{
      this.cola=false;
    }
  }

  ngOnInit(): void {
  }

}
