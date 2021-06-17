import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-cambio',
  templateUrl: './modal-cambio.component.html',
  styleUrls: ['./modal-cambio.component.css']
})
export class ModalCambioComponent implements OnInit {

  @Input() mensajeModal: string [];
  

  constructor(private toastr: ToastrService) {
    // Array mensajeModal(pos0: etiqueta modal, pos2: op1 pregunta, pos3:op2 pregunta, siguientes posiciones eventos)
    this.mensajeModal=[]
   }

  
   

  ngOnInit(): void {
  }


}
