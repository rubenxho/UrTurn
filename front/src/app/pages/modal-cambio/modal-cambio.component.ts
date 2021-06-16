import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-cambio',
  templateUrl: './modal-cambio.component.html',
  styleUrls: ['./modal-cambio.component.css']
})
export class ModalCambioComponent implements OnInit {

  @Input() mensajeModal: string [];
  @Output() eventoCola2= new EventEmitter<boolean>();

  constructor(private toastr: ToastrService) {
    // Array mensajeModal(pos0: etiqueta modal, pos2: op1 pregunta, pos3:op2 pregunta, siguientes posiciones eventos)
    this.mensajeModal=[]
   }

  
   modificar(){
    if(this.mensajeModal[5]){
      if(this.mensajeModal[4]){
        this.llamarEventoCola2(true)
      }
      else{
        this.llamarEventoCola2(false)
      }
    }
  }

  llamarEventoCola2(cola:boolean){
    this.eventoCola2.emit(cola)
  } 

  ngOnInit(): void {
  }


}
