import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente-colas',
  templateUrl: './cliente-colas.component.html',
  styleUrls: ['./cliente-colas.component.css']
})
export class ClienteColasComponent implements OnInit {

  public clienteCola: string [];
  

  constructor() { 

    this.clienteCola = ['modalModificar','¿Confirmas hacer la cola?', 'Sí', 'No', 'Salir de cola'];
    

  }

  ngOnInit(): void {
  }

}
