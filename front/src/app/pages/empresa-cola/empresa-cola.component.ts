import { Component, OnInit } from '@angular/core';
import { Puntuacion } from 'src/app/models/puntuacion';
import { UsuarioEncola } from 'src/app/models/usuario-encola';
import { BotonAvanzarService } from 'src/app/services/boton-avanzar.service';
import { DatosclientesService } from 'src/app/services/datosclientes.service';
import { DatosgeneralesService } from 'src/app/services/datosgenerales.service';
import { PuntuacionService } from 'src/app/services/puntuacion.service';

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

  //llamada servicio puntuacion
  public newPuntuacion: Puntuacion;

  constructor(public puntuacionService: PuntuacionService, private datosclientesService: DatosclientesService, private botonAvanzarService: BotonAvanzarService, private karmaService: PuntuacionService) {
    this.clientesEnCola=new Array();
    this.clienteVisto=new UsuarioEncola(0,0,"Sin Clientes","??????","??????","")
    this.mensajeModalCola = ['modalModificarCola','Confirmar nuevo tiempo de espera','Confirmar','Cancelar','Tiempo modificado correctamente!'];
    this.mensajeModalAvanzar = ['modalAvanzar','¿Desea avanzar la cola?','Si','No','Cola avanzada correctamente',"","3"];
    this.ampliarUsuario = true;
    this.infoUsuario = 'usuario1';
    
  }

  mostrarUsuario(index: number) {
    let id=this.clientesEnCola[index].id_usuario_cliente;
    console.log(id)
    this.karmaService.getKarma(id).subscribe((data:any)=>{
      this.karma=data.karma
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
      console.log("flag avanzar cola")
      let id=29
      this.botonAvanzarService.updBotonAvanzar(id).subscribe(data=>{
        this.clientesEnCola.splice(0, 1)
        console.log(data)
      })
    }
  }


  ngOnInit(): void {
    // Servicio datosClientes
    this.datosclientesService.getDatosClientes().subscribe((data:any)=>{
      this.clientesEnCola=data
      console.log(data);
      console.log(this.clientesEnCola)
    })
    

  }
}
