import { Component, OnInit, Input } from '@angular/core';
import { UsuarioEmpresa } from 'src/app/models/usuario-empresa';
import { LocalServiceService } from 'src/app/services/local-service.service';
import { FavoritoServiceService } from 'src/app/services/favorito-service.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cliente-favoritos',
  templateUrl: './cliente-favoritos.component.html',
  styleUrls: ['./cliente-favoritos.component.css'],
})
export class ClienteFavoritosComponent implements OnInit {

  constructor(public localService: LocalServiceService, public favoritoService: FavoritoServiceService) { 
    this.favoritoService.obtenerFav('','').subscribe((data: any) => {
      this.favoritoService.favoritos = data;
      console.log("obtenerFav", data);
      
    })
  }

  muestraLocal(){
    this.favoritoService.obtenerFav('','').subscribe((data: any) => {
      this.favoritoService.favoritos = data;
      console.log("obtenerFav", data);
      
    })
    
  }


  ngOnInit(): void {
    this.muestraLocal();
    this.localService.buscaLocal = "favoritos";
  }

}