import { Component, OnInit, Input } from '@angular/core';
import { LocalServiceService } from 'src/app/services/local-service.service';
import { UsuarioEmpresa } from 'src/app/models/usuario-empresa';

@Component({
  selector: 'app-cliente-home',
  templateUrl: './cliente-home.component.html',
  styleUrls: ['./cliente-home.component.css']
})
export class ClienteHomeComponent implements OnInit {
  
  public mostrarTarjetas:boolean

  // para localEmpresa
  @Input() usuarioEmpresa: any;

  public local: UsuarioEmpresa;
  public locales: UsuarioEmpresa[];

  /*********************************/
  constructor(private localService: LocalServiceService) { 

    //inicializar local
    this.local = new UsuarioEmpresa ();
    this.usuarioEmpresa = null;
    this.locales = [];
    //*************************/

    this.mostrarTarjetas=false
  }

  

  muestraLocal(){

    this.localService.getTop().subscribe((data: any) => {
      this.locales= data;
      console.log(this.locales)
    })
    
    // console.log(this.usuarioEmpresa);
    // this.localService.localElegido = this.usuarioEmpresa;
    
  }

  muestraTopLocal(){

    console.log(this.usuarioEmpresa);
    this.localService.localesTop = this.usuarioEmpresa;

  }

  

  ngOnInit(): void {
    this.muestraLocal()
  }

}
