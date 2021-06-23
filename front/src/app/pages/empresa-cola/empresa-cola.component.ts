import { Component, OnInit } from '@angular/core';
import { Puntuacion } from 'src/app/models/puntuacion';
import { PuntuacionService } from 'src/app/services/puntuacion.service';

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

  //llamada servicio puntuacion

  public newPuntuacion: Puntuacion;

  constructor(public puntuacionService: PuntuacionService) {
    this.mensajeModalCola=["modalModificarCola","Confirmar nuevo tiempo de espera","Confirmar","Cancelar","Tiempo modificado correctamente!"]
    this.mensajeModalAvanzar=["modalAvanzar","¿Desea avanzar la cola?","Si","No","Cola avanzada correctamente"]
    this.ampliarUsuario=true;
    this.infoUsuario="usuario1"

    //inicializar newPuntuacion
    this.newPuntuacion = new Puntuacion (0, 0, 0, "");
  }

  //funcion crear nueva puntuacion
  crearPuntuacion(id_usuario_cliente: number, id_usuario_empresa: number, date: string){

    let newPuntuacion = new Puntuacion(0, id_usuario_cliente, id_usuario_empresa, date)
    this.puntuacionService.addPuntuacion(newPuntuacion).subscribe(data => {

     console.log(data);

    });

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
