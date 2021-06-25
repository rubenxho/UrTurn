import { Component, OnInit, Output } from '@angular/core';
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
  //public opinionEmpresa={img:"", name:"", comment:"", estrellas: 1}
  public opinionEmpresas= []
  // falta llamar service de usuario_empresa para obtener id de usuario empresa.
  constructor(private opinionesService: ClienteOpinionesResenarService, private lse: LoginService) { 
   this.opinionEmpresas= []
  }
  // falta llamar service de usuario_empresa para obtener id de usuario empresa.
  getOpinionesEmpresa(){
    this.opinionesService.getEmpresaOpiniones(this.lse.login.id_usuario_empresa).subscribe((data:any)=>{
    this.opinionEmpresas=data
    this.opinionEmpresas
    })
  }
  ngOnInit(): void {
  }


}
