import { Component, OnInit } from '@angular/core';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-cliente-colas',
  templateUrl: './cliente-colas.component.html',
  styleUrls: ['./cliente-colas.component.css']
})
export class ClienteColasComponent implements OnInit {

  public clienteCola: string [];
  

  constructor(private turnoService: TurnoService) { 
    this.clienteCola = ['modalModificar','¿Confirmas hacer la cola?', 'Sí', 'No', 'Salir de cola'];

    this.turnoService.getDatosTurnos().subscribe((data:any)=>{
      console.log(data);
    })
  }

  ngOnInit(): void {
  }

}
