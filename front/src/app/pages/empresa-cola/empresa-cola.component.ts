import { Component, OnInit } from '@angular/core';
import { Puntuacion } from 'src/app/models/puntuacion';
import { UsuarioEmpresa } from 'src/app/models/usuario-empresa';
import { UsuarioEncola } from 'src/app/models/usuario-encola';
import { BotonAvanzarService } from 'src/app/services/boton-avanzar.service';
import { DatosclientesService } from 'src/app/services/datosclientes.service';
import { DatosgeneralesService } from 'src/app/services/datosgenerales.service';
import { LoginService } from 'src/app/services/login.service';
import { PuntuacionService } from 'src/app/services/puntuacion.service';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';

@Component({
  selector: 'app-empresa-cola',
  templateUrl: './empresa-cola.component.html',
  styleUrls: ['./empresa-cola.component.css'],
})
export class EmpresaColaComponent implements OnInit {
  public mensajeModalCola: string[];
  public mensajeModalAvanzar: string[];
  public ampliarUsuario: boolean;
  public infoUsuario: string;
  public clientesEnCola: UsuarioEncola [];
  public clienteVisto: UsuarioEncola
  public karma:string
  public datosEmpresa: UsuarioEmpresa []
  public input:string
  public clienteActual: any[]

  //llamada servicio puntuacion
  public newPuntuacion: Puntuacion;

  constructor(private datosclientesService: DatosclientesService,private id_usuario: LoginService, private botonAvanzarService: BotonAvanzarService, private karmaService: PuntuacionService, private empresaService: UsuarioServiceService) {
    this.clientesEnCola=new Array();
    this.clienteVisto=new UsuarioEncola(0,0,"Sin Clientes","??????","??????","")
    this.mensajeModalCola = ['modalModificarCola','Confirmar nuevo tiempo de espera','Confirmar','Cancelar','Tiempo modificado correctamente!',"","4"];
    this.mensajeModalAvanzar = ['modalAvanzar','¿Apuntar un strike al cliente?','Si','No','Turno avanzado correctamente',"","3"];
    this.ampliarUsuario = true;
    this.infoUsuario = 'usuario1';
    this.datosEmpresa= new Array()
    this.empresaService.obtenerUserEmpresaId(this.id_usuario.login.id_usuario_empresa).subscribe((data:any)=>{
      // console.log(data);
      this.datosEmpresa=data
      // console.log(this.datosEmpresa)
    })
    this.clienteActual=new Array()
  }

  mostrarUsuario(index: number) {
    let id=this.clientesEnCola[index].id_usuario_cliente;
    console.log(id)
    this.karmaService.getKarma(id).subscribe((data:any)=>{
      this.karma=data.karma
      this.clientesEnCola[index].karma=data.karma
      console.log(this.karmaService)
      console.log(data);
      
    })
    this.clienteVisto = this.clientesEnCola[index];
  }

  modificar() {
    this.ampliarUsuario = false;
  }

  botonAvanzarCola(click:boolean){
    if(click==true){
      this.botonAvanzarService.addStrike(this.id_usuario.login.id_usuario_empresa).subscribe(data=>{
        this.clienteActual.splice(0, 1)
        console.log(data)
      })
    }
  }

  modificarTiempo(cola:boolean){
    console.log("modificar tiempo")
    console.log(this.datosEmpresa)
    this.datosEmpresa[0].tiempo_espera=parseInt(this.input,0)
    this.empresaService.actualizarUserEmpresa(this.datosEmpresa[0])
      .subscribe((data:any)=>{
      })
  }

  mostrarInput(inputLeido:string ){
    this.input=inputLeido
    
  }

  ngOnInit(): void {
    // Servicio datosClientes
    this.datosclientesService.getDatosClientes(this.id_usuario.login.id_usuario_empresa).subscribe((data:any)=>{
      this.clientesEnCola=data
      console.log(this.clientesEnCola)
    })

    this.botonAvanzarService.obtenerClienteActual(this.id_usuario.login.id_usuario_empresa).subscribe((data:any)=>{
      this.clienteActual=data
      console.log(this.clienteActual)
    })
    
    
    console.log("flag2");
    
    
  }
}