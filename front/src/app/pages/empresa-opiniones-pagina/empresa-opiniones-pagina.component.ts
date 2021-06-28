import { Component, OnInit, Input,Output } from '@angular/core';
import { data } from 'jquery';
import { Opiniones } from 'src/app/models/opiniones';
import { ClienteOpinionesResenarService } from 'src/app/services/cliente-opiniones-resenar.service';
import { UsuarioEmpresa } from 'src/app/models/usuario-empresa';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-empresa-opiniones-pagina',
  templateUrl: './empresa-opiniones-pagina.component.html',
  styleUrls: ['./empresa-opiniones-pagina.component.css']
})
export class EmpresaOpinionesPaginaComponent implements OnInit {
  public opiniones: any[];

  constructor(private opinionesService: ClienteOpinionesResenarService, private lse: LoginService) { 
   this.opiniones=[];
  }

  getOpiniones(){
    this.opinionesService.getOpinionesAEmpresa(this.lse.login.id_usuario_empresa).subscribe((data:any)=>{
      console.log(data)
      return this.opiniones = data;
    })
  }

  ngOnInit(): void {
    this.opinionesService.getOpinionesAEmpresa(this.lse.login.id_usuario_empresa).subscribe((data:any)=>{
      console.log(data)
      return this.opiniones = data;
    })
  }
}
