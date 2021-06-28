import { Component, OnInit } from '@angular/core';
import { DatosGenerales } from 'src/app/models/datos-generales';
import { UsuarioEmpresa } from 'src/app/models/usuario-empresa';
import { DatosgeneralesService } from 'src/app/services/datosgenerales.service';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';

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
  public datosEmpresa: UsuarioEmpresa []
  public input:string

  constructor(private datosGeneralesService: DatosgeneralesService, private id_usuario: LoginService, private empresaService: UsuarioServiceService ) {
    this.datosEmpresa=new Array()
    this.datosGenerales= new DatosGenerales(0,0,"",0)
    this.mensajeModal=["modalModificar","Confirmar nuevo tiempo de espera","Confirmar","Cancelar","Tiempo modificado correctamente!","","4"]
    // Array(pos0: etiqueta modal, pos1: pregunta, pos2: op1 pregunta, pos3:op2 pregunta, pos4: estadocola, pos5: flag para pos4)
    this.mensajeModalIniciar=["modalIniciar","Confirmar si desea iniciar la cola","Confirmar","Cancelar","Se ha iniciado la cola",false,"1"]
    this.mensajeModalDetener=["modalDetener","Confirmar si desea detener la cola","Confirmar","Cancelar","Se ha detenido la cola",true,"1"]
    
    this.datosGeneralesService.getDatosGenerales(this.id_usuario.login.id_usuario_empresa).subscribe((data:any)=>{
      this.datosGenerales=data
    })

    this.empresaService.obtenerUserEmpresaId(this.id_usuario.login.id_usuario_empresa).subscribe((data:any)=>{
      this.datosEmpresa=data
      if(this.datosEmpresa[0].estado_turno=="Turno Activo"){
       this.estadoCola=true; 
      }
      else{
        this.estadoCola=false;
      }
    })
    

    console.log(this.id_usuario.login.id_usuario_empresa+ "empresa login")
  }

 
  botonIniciarDetener(cola:boolean){
    if(cola==true){
      this.estadoCola=false
      this.datosEmpresa[0].estado_turno="Turno Detenido"
    }
    else{
      this.estadoCola=true
      this.datosEmpresa[0].estado_turno="Turno Activo"
    }
    this.empresaService.actualizarUserEmpresa(this.datosEmpresa[0])
      .subscribe((data:any)=>{
      })
    
  }

  modificarTiempo(cola:boolean){
    this.datosEmpresa[0].tiempo_espera=parseInt(this.input,0)
    this.empresaService.actualizarUserEmpresa(this.datosEmpresa[0])
      .subscribe((data:any)=>{
      })
  }

  mostrarInput(inputLeido:string ){
    this.input=inputLeido
    
  }

  ngOnInit(): void {
  }

}
