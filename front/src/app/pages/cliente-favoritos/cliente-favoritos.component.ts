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

  // para localEmpresa
  @Input() usuarioEmpresa: any;

  public local: UsuarioEmpresa;
  public locales: UsuarioEmpresa[];
  public favoritos: UsuarioEmpresa[];

  /*********************************/
  
  // public locales: UsuarioEmpresa[];
  

  constructor(private localService: LocalServiceService,private favoritoService:FavoritoServiceService, private loginService: LoginService ) {

    this.locales = [];
    this.favoritos=[]
  }

//evento para mostrar en detalle los favoritos pinchando en su imagen
  // muestraLocal(){
    
  //   this.localService.getLocal(this.loginService.login.id_usuario_cliente).subscribe( (data: any) => {
  //     this.favoritos = data;
      
  //   })
    
  // }

//evento para filtrar la búsqueda de locales favoritos
  filtrar(filtro:string[]){
   
    
    this.favoritoService.obtenerFav(filtro[0], filtro[1], 0).subscribe((data:UsuarioEmpresa[])=>{
        this.favoritos = data;

      })
    
  }
    
 
  
  ngOnInit(): void {}
    
}