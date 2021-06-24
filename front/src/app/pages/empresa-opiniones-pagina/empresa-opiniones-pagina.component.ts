import { Component, OnInit, Output } from '@angular/core';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';

@Component({
  selector: 'app-empresa-opiniones-pagina',
  templateUrl: './empresa-opiniones-pagina.component.html',
  styleUrls: ['./empresa-opiniones-pagina.component.css']
})
export class EmpresaOpinionesPaginaComponent implements OnInit {

  public opinionEmpresa={img:"", name:"", comment:"", estrellas: 1}

  constructor(private apiserv:UsuarioServiceService) { 

  }

  ngOnInit(): void {
  }
  public buscar(id:number){
    if(id>0){
      this.apiserv.obtenerUserEmpresaId(id).subscribe( (data:any)=>{
        // console.log(data)
        return this.apiserv = data;
      })
    }else{
      this.apiserv.obtenerUserEmpresaId(id).subscribe( (data: any) =>{ 
        return this.apiserv = data;
      });
    }
  }
}
