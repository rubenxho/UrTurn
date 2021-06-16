import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Input() mensajeModal: string[];
  @Output() eventoCola = new EventEmitter<boolean>();

  constructor() {
    // Array mensajeModal(pos0: etiqueta modal, pos2: op1 pregunta, pos3:op2 pregunta, siguientes posiciones eventos)
    this.mensajeModal = [];
  }

  //Funcion para modificar cambios de estados en el home-empresa (Iniciar/detener)
  modificar() {
    console.log('flaggg');

    if (this.mensajeModal[5]) {
      if (this.mensajeModal[4]) {
        this.llamarEventoCola(true);
      } else {
        this.llamarEventoCola(false);
      }
    }
  }

  llamarEventoCola(cola: boolean) {
    this.eventoCola.emit(cola);
  }

  ngOnInit(): void {}
}
