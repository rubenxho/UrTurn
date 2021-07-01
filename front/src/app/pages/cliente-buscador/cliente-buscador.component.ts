import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { FavoritoServiceService } from 'src/app/services/favorito-service.service';
import { LocalServiceService } from 'src/app/services/local-service.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-cliente-buscador',
  templateUrl: './cliente-buscador.component.html',
  styleUrls: ['./cliente-buscador.component.css']
})
export class ClienteBuscadorComponent implements OnInit {

  constructor(
    public localService: LocalServiceService, 
    public loginService: LoginService, 
    public favoritoService: FavoritoServiceService 
  ) 
  { }

  buscarLocal(categoria: string, cp: string){ 
    if (this.localService.buscaLocal == "home"){
      console.log(categoria)
      this.localService.getLocales(categoria, parseInt(cp)).subscribe((data: any) => {
        //data es variable para inyectarsela a las tarjetas.
        this.localService.locales = data;
        console.log(data)
        this.localService.mostrarTarjetas = true;
      })

    }else if (this.localService.buscaLocal == "favoritos"){
      console.log('favoritos servicio');
      
      this.favoritoService.obtenerFav(categoria, cp).subscribe((data: any) => {
        //data es variable para inyectarsela a las tarjetas.
        this.favoritoService.favoritos = data;
        console.log(data);
        
    
      })

    }
    
  }

  buscarFavoritos(categoria: string, cp: string){ 
    this.localService.getLocales(categoria, parseInt(cp)).subscribe((data: any) => {
      //data es variable para inyectarsela a las tarjetas.
      this.localService.locales = data;
      this.localService.mostrarTarjetas = true;
    })
  }
  ngOnInit(): void {
  }
}
