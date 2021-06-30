import { Component, OnInit, Input } from '@angular/core';
import { LocalServiceService } from 'src/app/services/local-service.service';
import { UsuarioEmpresa } from 'src/app/models/usuario-empresa';
import { FavoritoServiceService } from 'src/app/services/favorito-service.service';
import { Favoritos } from 'src/app/models/favoritos';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-cliente-home',
  templateUrl: './cliente-home.component.html',
  styleUrls: ['./cliente-home.component.css']
})
export class ClienteHomeComponent implements OnInit {
  
  // para localEmpresa
  // @Input() usuarioEmpresa: any;

 public favoritos:Favoritos []
public localesCoincidentes: number[]

  /*********************************/
  constructor(public localService: LocalServiceService, private favService: FavoritoServiceService) { 
      this.localesCoincidentes=[]
    
  }

  muestraLocal(){
    this.localService.getTop().subscribe((data: any) => {
      this.localService.locales = data;
      console.log("getTop()", data);
      
      //para mostrar otra vez el carrusel, volvemos a poner la variable mostrarTarjeta a false
      this.localService.mostrarTarjetas = false;
    })
    
    // console.log(this.usuarioEmpresa);
    // this.localService.localElegido = this.usuarioEmpresa;
    
  }

  traeFav(){
    this.favService.obtenerFav("","").subscribe((data:any)=>{
      this.favoritos=data
      this.comparaId()
    })
  }

  comparaId(){
    this.localService.locales.forEach((element)=>{
      for(let i=0;i<this.favoritos.length;i++){
        if(element.id_usuario_empresa == this.favoritos[i].id_usuario_empresa){
            this.localesCoincidentes.push(element.id_usuario_empresa)
        }
      }
    })

  }

  ngOnInit(): void {
    this.muestraLocal();
    this.localService.buscaLocal = "home";
    this.traeFav();
  }
}
