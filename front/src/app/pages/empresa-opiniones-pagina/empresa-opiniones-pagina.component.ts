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
  public opinionesParaEmpresa: Opiniones[];

  constructor(private opinionesService: ClienteOpinionesResenarService, private lse: LoginService) { 
   this.opinionesParaEmpresa=[];
  }

  getOpiniones(){
    this.opinionesService.getOpinionesAEmpresa(this.lse.login.id_usuario_empresa).subscribe((data:any):void=>{
      for (let i = 0; i < data.length; i++) {
        this.opinionesParaEmpresa.push( new Opiniones(
          data[i].id_opiniones,
          data[i].id_usuario_cliente,
          data[i].nombre_cliente,
          data[i].imagen_url,
          this.lse.login.id_usuario_empresa,
          "",
          "",
          data[i].nota,
          data[i].opinion,
          data[i].fecha
      ))
    }})
  }


  ngOnInit(): void {
    this.getOpiniones()
  }
}
