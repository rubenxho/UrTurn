import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Favoritos } from '../models/favoritos';
import { UsuarioEmpresa } from '../models/usuario-empresa';


@Injectable({
  providedIn: 'root'
})
export class FavoritoServiceService {
private url:string
public favoritos: UsuarioEmpresa[];
  constructor(private http:HttpClient) {
    this.url="http://localhost:3000/favoritos"
    this.favoritos = []
  }

  obtenerFav(categoria:string, cp:string, id_usuario_cliente:number){
    let codigo:any
    console.log("flag")
    if(cp=="" && categoria=="" ){
      console.log("hola")
     codigo = this.http.get(this.url + `?id=` + id_usuario_cliente)
    }

    else if(cp==""){
      codigo= this.http.get(this.url + `?categoria=` + categoria + `&` + `?id=` + id_usuario_cliente)
    }

    else if(categoria==""){
      codigo = this.http.get(this.url + `?cp=` + cp + `&` + `?id=` + id_usuario_cliente)
    }

    else{
      codigo = this.http.get(this.url +`?categoria=`+ categoria + `&` + `?cp=` + cp + `&` + `?id=` + id_usuario_cliente)
    }

    return codigo
  }

  

  anyadirFav(id_usuario_cliente:number, id_usuario_empresa:number){
    let nuevoFav:Favoritos= new Favoritos (id_usuario_cliente, id_usuario_empresa)
    return this.http.post(this.url ,nuevoFav )
  }
}

