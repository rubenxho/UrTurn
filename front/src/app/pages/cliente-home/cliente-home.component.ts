import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente-home',
  templateUrl: './cliente-home.component.html',
  styleUrls: ['./cliente-home.component.css']
})
export class ClienteHomeComponent implements OnInit {
  
  public mostrarTarjetas:boolean
  constructor() { 
    this.mostrarTarjetas=false
  }

  eventoMostrar(sustituir:boolean){
    this.mostrarTarjetas=sustituir
  }
  ngOnInit(): void {
  }

}
