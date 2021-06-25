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

  constructor(private toastr: ToastrService) {
    // Array mensajeModal(pos0: etiqueta modal, pos2: op1 pregunta, pos3:op2 pregunta, siguientes posiciones eventos)
    this.mensajeModal = [];
  }

  //Funcion para modificar cambios de estados en el home-empresa (Iniciar/detener)
  modificar(mensajeToast: string) {
    //Evento Home-Empresa
    if (this.mensajeModal[6]) {
      if (this.mensajeModal[5]) {
        this.llamarEventoCola(true);
      } else {
        this.llamarEventoCola(false);
      }
    }
    //Eveneto Guardar Perfil @kehomaxd
    if(this.mensajeModal[6] == "2"){
      console.log("flag click yes")
      this.llamarEventoGuardarPerfil(true)
    }
    this.showSuccess(mensajeToast);
  }

  rechazar(mensaje: string) {
    this.toastr.error(mensaje);
  }

  showSuccess(mensaje: string) {
    this.toastr.success(mensaje);
  }

  llamarEventoCola(cola: boolean) {
    this.eventoCola.emit(cola);
  }

  //Evento para guardar perfil
  llamarEventoGuardarPerfil(guardar:boolean){
    console.log("flag evento hijo")
    console.log(true)
    this.eventoGuardarPerfil.emit(guardar);
  }

  ngOnInit(): void {}
}
