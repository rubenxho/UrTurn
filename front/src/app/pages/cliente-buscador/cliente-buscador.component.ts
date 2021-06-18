import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-cliente-buscador',
  templateUrl: './cliente-buscador.component.html',
  styleUrls: ['./cliente-buscador.component.css']
})
export class ClienteBuscadorComponent implements OnInit {
  @Output() eventoMostrar= new EventEmitter<boolean>();
  public sustituir:boolean=true
 
  constructor() { 
    this.sustituir
  }


  mostrarTarjetas(){
    console.log("funciion mostrarTarjetas");
    this.eventoMostrar.emit(this.sustituir)
    
  }

  ngOnInit(): void {
  }

}
