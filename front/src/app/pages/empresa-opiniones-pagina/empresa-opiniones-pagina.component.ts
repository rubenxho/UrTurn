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
  //public opinionEmpresa={img:"", name:"", comment:"", estrellas: 1}
  public opiniones:any;
    public data:any = {
    estrellas:0
  }
  public stars:any;

  constructor(private opinionesService: ClienteOpinionesResenarService, private lse: LoginService) { 
   this.opiniones="";
   this.stars=0
  }


  handleStar(event:any){
    const index:string = event.target.name
    const value:String = event.target.value;
    this.data[ index ] = value;
    console.log(this.data)
  }

  getOpiniones(){
    // this.lse.login.id_usuario_empresa
    let id = this.lse.login.id_usuario_empresa
    this.opinionesService.getOpinionesAEmpresa(30).subscribe((date:any)=>{
    console.log(date)
    return this.opiniones = date;
    })
  }

  //mostrarEstrella(){
  //  this.opiniones.
  //}


  ngOnInit(): void {
// this.lse.login.id_usuario_empresa
    let id = this.lse.login.id_usuario_empresa
    this.opinionesService.getOpinionesAEmpresa(30).subscribe((date:any)=>{
    console.log(date)
    return this.opiniones = date;
    })
}
}
