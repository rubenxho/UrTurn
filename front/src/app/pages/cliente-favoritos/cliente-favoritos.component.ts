import { Component, OnInit } from '@angular/core';
import { UsuarioEmpresa } from 'src/app/models/usuario-empresa';
import { LocalServiceService } from 'src/app/services/local-service.service';
import { FavoritoServiceService } from 'src/app/services/favorito-service.service';

@Component({
  selector: 'app-cliente-favoritos',
  templateUrl: './cliente-favoritos.component.html',
  styleUrls: ['./cliente-favoritos.component.css'],
})
export class ClienteFavoritosComponent implements OnInit {
  
  public locales: UsuarioEmpresa[];
  public favoritos: UsuarioEmpresa[];

  constructor(private localService: LocalServiceService,private favoritoService:FavoritoServiceService ) {

    this.locales = [];
    this.favoritos=[]
  }

//evento para mostrar en detalle los favoritos pinchando en su imagen
  muestraLocal(id: number){
    
    this.localService.getLocal(id).subscribe( (data: any) => {
      this.locales = data;
      
    })
  }

//evento para filtrar la búsqueda de locales favoritos
  filtrar(filtro:string[]){
   
    
    this.favoritoService.obtenerFav(filtro[0], filtro[1], 0).subscribe((data:UsuarioEmpresa[])=>{
        this.favoritos = data;

      })
    
  }
    
 
  
  ngOnInit(): void {}

}