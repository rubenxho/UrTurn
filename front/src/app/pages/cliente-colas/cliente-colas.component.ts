import { Component, OnInit } from '@angular/core';
import { EmpresaEncola } from 'src/app/models/empresa-encola';
import { LoginService } from 'src/app/services/login.service';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-cliente-colas',
  templateUrl: './cliente-colas.component.html',
  styleUrls: ['./cliente-colas.component.css']
})
export class ClienteColasComponent implements OnInit {

  public clienteCola: string [];
  public empresasCola: EmpresaEncola [];
  public posicion:number
  

  constructor(private turnoService: TurnoService, private id_usuario: LoginService) { 
    this.clienteCola = ['modalModificar','¿Desea dejar su turno?', 'Sí', 'No', 'Su turno se ha cancelado','','5'];
    // this.turnoService.postHacerCola(7,66).subscribe((data:any)=>{
    //   console.log("Nuevo cliente en cola")
    // })
  }

  botonCancelar(index:number){
    console.log(index)
    this.posicion=index;
    console.log(this.empresasCola[index])
  }

  cancelarCola(cola:boolean){
    if(cola==true){
      this.turnoService.putCancelarTurno(this.empresasCola[this.posicion].id_turno).subscribe((data:any)=>{
        console.log("turno cancelado")
      })
      this.empresasCola.splice(this.posicion,1)
    }
  }

  ngOnInit(): void {
    this.turnoService.getDatosTurnos(this.id_usuario.login.id_usuario_cliente).subscribe((data:any)=>{
      this.empresasCola=data;
      console.log(data)
    })
  }

}
