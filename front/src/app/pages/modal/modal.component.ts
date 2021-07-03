import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  
  @Input() mensajeModal: any[];
  @Output() eventoCola = new EventEmitter<boolean>();
  @Output() eventoGuardarPerfil = new EventEmitter<boolean>();
  @Output() eventoAvanzarCola = new EventEmitter<boolean>();
  @Output() eventoModificarTiempo = new EventEmitter<boolean>();
  @Output() eventoCancelarCola = new EventEmitter<boolean>();

  constructor(private toastr: ToastrService) {
    // Array mensajeModal(pos0: etiqueta modal, pos2: op1 pregunta, pos3:op2 pregunta, siguientes posiciones eventos)
    this.mensajeModal = [];
  }

  //Funcion para modificar cambios de estados en el home-empresa (Iniciar/detener)
  modificar(mensajeToast: string) {
    // Evento home-empresa
    console.log(this.mensajeModal)
    if (this.mensajeModal[6]=="1") {
      if (this.mensajeModal[5]==true) {
        this.llamarEventoCola(true);
      } else {
        this.llamarEventoCola(false);
      }
    }
    // Evento Guardar perfil @Kehomaxd
    if(this.mensajeModal[6]=="2"){
      this.llamarEventoGuardarPerfil(true)
    }
    // Evento Boton Avanzar cola
    if(this.mensajeModal[6]=="3"){
      this.llamarEventoAvanzarCola(true)
    }
    //Evento modificar T.E empresa
    if(this.mensajeModal[6]=="4"){
      this.llamarEventoModificarTiempo(true)
    }
    if(this.mensajeModal[6]=="5"){
      this.llamarEventoCancelarCola(true)
    }

    // this.showSuccess(mensajeToast);
  }


  rechazar(mensaje: string) {
    this.toastr.error(mensaje);
  }

  // showSuccess(mensaje: string) {
  //   this.toastr.success(mensaje,mensaje,{
  //     "positionClass": "toast-top-full-width"
  //   });
  // }


  // Evento para guardar-perfil
  llamarEventoGuardarPerfil(guardar: boolean) {
    this.eventoGuardarPerfil.emit(guardar);
  }

  // Evento boton Avanzar Cola
  llamarEventoAvanzarCola(click: boolean) {
    this.eventoAvanzarCola.emit(click);
  }

  //Evento para home-empresa
  llamarEventoCola(cola: boolean) {
    this.eventoCola.emit(cola);
  }

  //Evento para home-empresa
  llamarEventoModificarTiempo(cola: boolean) {
    this.eventoModificarTiempo.emit(cola);
  }

  //Evento para cliente-cancelar cola
  llamarEventoCancelarCola(cola: boolean) {
    this.eventoCancelarCola.emit(cola);
  }

  ngOnInit(): void {}
}
