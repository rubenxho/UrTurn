import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empresa-cola',
  templateUrl: './empresa-cola.component.html',
  styleUrls: ['./empresa-cola.component.css']
})
export class EmpresaColaComponent implements OnInit {

  public mensajeModalCola: string[]
  public mensajeModalAvanzar: string[]
  public ampliarUsuario:boolean;
  public infoUsuario:string;

  constructor() {
    this.mensajeModalCola=["modalModificarCola","Confirmar nuevo tiempo de espera","Confirmar","Cancelar","Tiempo modificado correctamente!"]
    this.mensajeModalAvanzar=["modalAvanzar","¿Desea avanzar la cola?","Si","No","Cola avanzada correctamente"]
    this.ampliarUsuario=true;
    this.infoUsuario="usuario1"
  }

  ngOnInit(): void {
  }

  mostrarUsuario(nombre:string){
    this.infoUsuario=nombre;
  }

  modificar(){
    this.ampliarUsuario=false;
  }
}
