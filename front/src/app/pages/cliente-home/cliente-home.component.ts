import { Component, OnInit, Input } from '@angular/core';
import { LocalServiceService } from 'src/app/services/local-service.service';
import { UsuarioEmpresa } from 'src/app/models/usuario-empresa';

@Component({
  selector: 'app-cliente-home',
  templateUrl: './cliente-home.component.html',
  styleUrls: ['./cliente-home.component.css']
})
export class ClienteHomeComponent implements OnInit {
  
  // para localEmpresa
  // @Input() usuarioEmpresa: any;

  

  /*********************************/
  constructor(public localService: LocalServiceService) { 

    
  }

  muestraLocal(){
    this.localService.getTop().subscribe((data: any) => {
      this.localService.locales= data;
      //para mostrar otra vez el carrusel, volvemos a poner la variable mostrarTarjeta a false
      this.localService.mostrarTarjetas = false;
    })
    
    // console.log(this.usuarioEmpresa);
    // this.localService.localElegido = this.usuarioEmpresa;
    
  }
  ngOnInit(): void {
    this.muestraLocal()
  }
}
