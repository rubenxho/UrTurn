import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Input() mensajeModal: string[];
  @Output() eventoCola = new EventEmitter<boolean>();
  @Output() eventoGuardarPerfil = new EventEmitter<boolean>();
  @Output() eventoAvanzarCola = new EventEmitter<boolean>();

  constructor(private toastr: ToastrService) {
    // Array mensajeModal(pos0: etiqueta modal, pos2: op1 pregunta, pos3:op2 pregunta, siguientes posiciones eventos)
    this.mensajeModal = [];
  }

  //Funcion para modificar cambios de estados en el home-empresa (Iniciar/detener)
  modificar(mensajeToast: string) {
    // Evento home-empresa
    if (this.mensajeModal[6]=="1") {
      if (this.mensajeModal[5]) {
        this.llamarEventoCola(true);
      } else {
        this.llamarEventoCola(false);
      }
    }
    // Evento Guardar perfil kehoma
    if(this.mensajeModal[6]=="2"){
      this.llamarEventoGuardarPerfil(true)
    }
    // Evento Boton Avanzar cola
    if(this.mensajeModal[6]=="3"){
      this.llamarEventoAvanzarCola(true)
    }

    this.showSuccess(mensajeToast);
  }


  rechazar(mensaje: string) {
    this.toastr.error(mensaje);
  }

  showSuccess(mensaje: string) {
    this.toastr.success(mensaje);
  }


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

  ngOnInit(): void {}
}
