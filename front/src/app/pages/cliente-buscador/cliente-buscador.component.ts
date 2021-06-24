import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-cliente-buscador',
  templateUrl: './cliente-buscador.component.html',
  styleUrls: ['./cliente-buscador.component.css']
})
export class ClienteBuscadorComponent implements OnInit {
  @Output() eventoMostrar= new EventEmitter<boolean>();
  @Output() eventoFiltrar= new EventEmitter<string[]>();
  

  public sustituir:boolean=true
  
  constructor() { 
    this.sustituir
  }


  mostrarTarjetas(){
    console.log("funciion mostrarTarjetas");
    this.eventoMostrar.emit(this.sustituir)
    
  }

  buscar(categoria:string, cp:string)
  {
    console.log(categoria, cp);
    this.eventoFiltrar.emit([categoria, cp]) 
  }

  

  ngOnInit(): void {
  }

}
