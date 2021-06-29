import { Component, OnInit } from '@angular/core';
import { FavoritoServiceService } from 'src/app/services/favorito-service.service';
import { LocalServiceService } from 'src/app/services/local-service.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cliente-busca-favoritos',
  templateUrl: './cliente-busca-favoritos.component.html',
  styleUrls: ['./cliente-busca-favoritos.component.css']
})
export class ClienteBuscaFavoritosComponent implements OnInit {

  constructor(
              public localService: LocalServiceService, 
              public loginService: LoginService, 
              public favoritoService: FavoritoServiceService
    ) { }

  buscarFavoritos(categoria: string, cp: string){ 
  
    console.log(typeof(categoria)+" test");
    console.log(typeof(cp)+" test");
      
    this.localService.getLocales(categoria, parseInt(cp)).subscribe((data: any) => {
      console.log("Estoy en lupa", data);
      //data es variable para inyectarsela a las tarjetas.
      this.localService.locales = data;
      this.localService.mostrarTarjetas = true;
    })
  }

  filtrar(filtro:string[]){
    console.log(filtro)
      console.log(this.loginService.login.id_usuario_cliente )
      this.favoritoService.obtenerFav(filtro[0], filtro[1] ).subscribe((data:any[])=>{
          this.favoritoService.favoritos = data;
          console.log(data);
        }
      )
      
  }

  ngOnInit(): void {
  }

}
