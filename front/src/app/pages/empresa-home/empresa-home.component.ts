import { Component, OnInit } from '@angular/core';
import { DatosGenerales } from 'src/app/models/datos-generales';
import { DatosgeneralesService } from 'src/app/services/datosgenerales.service';

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
  public datosGenerales: DatosGenerales

  constructor(private datosGeneralesService: DatosgeneralesService) {
    this.datosGenerales= new DatosGenerales(0,0,"",0)
    this.estadoCola=true
    this.mensajeModal=["modalModificar","Confirmar nuevo tiempo de espera","Confirmar","Cancelar","Tiempo modificado correctamente!"]
    // Array(pos0: etiqueta modal, pos1: pregunta, pos2: op1 pregunta, pos3:op2 pregunta, pos4: estadocola, pos5: flag para pos4)
    this.mensajeModalIniciar=["modalIniciar","Confirmar si desea iniciar la cola","Confirmar","Cancelar","Se ha iniciado la cola",this.estadoCola,"1"]
    this.mensajeModalDetener=["modalDetener","Confirmar si desea detener la cola","Confirmar","Cancelar","Se ha detenido la cola",this.estadoCola,"1"]
    
    this.datosGeneralesService.getDatosGenerales().subscribe((data:any)=>{
      console.log(data);
      this.datosGenerales=data
      console.log(this.datosGenerales)
    })
    
  }

 
  botonIniciarDetener(cola:boolean){
    if(cola==true){
      this.estadoCola=false
      this.mensajeModalIniciar[5]=this.estadoCola
      this.mensajeModalDetener[5]=this.estadoCola

    }
    else{
      this.estadoCola=true
      this.mensajeModalIniciar[5]=this.estadoCola
      this.mensajeModalDetener[5]=this.estadoCola
    }
    
  }

  ngOnInit(): void {
  }

}
