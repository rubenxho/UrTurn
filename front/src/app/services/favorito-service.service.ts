import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Favoritos } from '../models/favoritos';
import { UsuarioEmpresa } from '../models/usuario-empresa';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class FavoritoServiceService {
private url:string
public favoritos: UsuarioEmpresa[];
  constructor(private http:HttpClient, private loginService: LoginService) {
    this.url="https://apiurturn.herokuapp.com/favoritos"
    this.favoritos = []
  }

  obtenerFav(categoria:string, cp:string){
    let codigo:any
    console.log("flag")
    if(cp=="" && categoria=="" ){
      console.log("hola")
     codigo = this.http.get(this.url + `?id=` + this.loginService.login.id_usuario_cliente)
    }

    else if(cp==""){
      console.log("hola2")
      codigo= this.http.get(this.url + `?categoria=` + categoria + `&` + `?id=` + this.loginService.login.id_usuario_cliente)
    }

    else if(categoria==""){
      console.log("hola3")
      codigo = this.http.get(this.url + `?cp=` + cp + `&` + `?id=` + this.loginService.login.id_usuario_cliente)
    }

    else{
      console.log("hola4")
      codigo = this.http.get(this.url +`?categoria=`+ categoria + `&` + `?cp=` + cp + `&` + `?id=` + this.loginService.login.id_usuario_cliente)
      console.log(categoria + cp);
      
    }

    return codigo
  }

  

  anyadirFav( id_usuario_empresa:number){
    let nuevoFav:Favoritos= new Favoritos (this.loginService.login.id_usuario_cliente, id_usuario_empresa)
    return this.http.post(this.url ,nuevoFav )
  }

  eliminarFav( id_usuario_empresa:number){
    
    return this.http.delete(this.url + id_usuario_empresa )
  }
}

