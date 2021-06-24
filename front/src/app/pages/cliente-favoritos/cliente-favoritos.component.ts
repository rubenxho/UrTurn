import { Component, OnInit } from '@angular/core';
import { UsuarioEmpresa } from 'src/app/models/usuario-empresa';
import { FavoritoServiceService } from 'src/app/services/favorito-service.service';

@Component({
  selector: 'app-cliente-favoritos',
  templateUrl: './cliente-favoritos.component.html',
  styleUrls: ['./cliente-favoritos.component.css'],
})
export class ClienteFavoritosComponent implements OnInit {
  
  public favoritos: UsuarioEmpresa[];
  


  constructor(private favoritoService:FavoritoServiceService) {
    this.favoritos=[]
  }

  filtrar(filtro:string[]){
   
    
    this.favoritoService.obtenerFav(filtro[0], filtro[1], 0).subscribe((data:UsuarioEmpresa[])=>{
        this.favoritos = data;

      })
    
  }



  ngOnInit(): void {}
}
