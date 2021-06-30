import { Component, Input, OnInit } from '@angular/core';
import { Opiniones } from 'src/app/models/opiniones';

@Component({
  selector: 'app-empresa-opiniones',
  templateUrl: './empresa-opiniones.component.html',
  styleUrls: ['./empresa-opiniones.component.css']
})
export class EmpresaOpinionesComponent implements OnInit {
  // opinionHijo es la comunicacion con la pagina cliente-opinion que mostrar todas opiniones de empresa al cliente.
  @Input() opinionHijo:Opiniones;
  // opinionDeCliente es la comunicacion con la pagina empresa-opinion que mostrar todas opiniones de cliente a la empresa.
  @Input() isEmpresa: boolean;
  @Input() isCliente: boolean;
  
  public data:any = {
    estrellas:0
  }

  constructor() {}

  ngOnInit(): void {
    //console.log(this.opinionHijo);
    //console.log(this.opinionHijo.usuario_imagen_empresa)
  }

  
}
