import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente-colas',
  templateUrl: './cliente-colas.component.html',
  styleUrls: ['./cliente-colas.component.css']
})
export class ClienteColasComponent implements OnInit {

  public clienteCola: string [];

  constructor() { 

    this.clienteCola = ["modalModificar","¿Seguro que desea salir de la cola?", "Salir", "Permanecer", "Sale de la cola"];

  }

  ngOnInit(): void {
  }

}
