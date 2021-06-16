import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empresa-home',
  templateUrl: './empresa-home.component.html',
  styleUrls: ['./empresa-home.component.css']
})
export class EmpresaHomeComponent implements OnInit {

  public mensajeModal: string[]
  public mensajeModalIniciar: any[]
  public mensajeModalDetener: any[]
  public estadoCola:boolean

  constructor() {
    this.estadoCola=true
    this.mensajeModal=["modalModificar","Confirmar si esta de acuerdo","Confirmar","No"]
    // Array(pos0: etiqueta modal, pos1: pregunta, pos2: op1 pregunta, pos3:op2 pregunta, pos4: estadocola, pos5: flag para pos4)
    this.mensajeModalIniciar=["modalIniciar","Confirmar si desea iniciar la cola","Confirmar","Cancelar",this.estadoCola,"1"]
    this.mensajeModalDetener=["modalDetener","Confirmar si desea detener la cola","Confirmar","Cancelar",this.estadoCola,"1"]
    
    
   }

 
  botonIniciarDetener(cola:boolean){
    if(cola==true){
      this.estadoCola=false
      this.mensajeModalIniciar[4]=this.estadoCola
      this.mensajeModalDetener[4]=this.estadoCola

    }
    else{
      this.estadoCola=true
      this.mensajeModalIniciar[4]=this.estadoCola
      this.mensajeModalDetener[4]=this.estadoCola
    }
    
  }

  ngOnInit(): void {
  }

}
